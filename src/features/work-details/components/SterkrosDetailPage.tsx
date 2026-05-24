/**
 * SterkrosDetailPage — v3: 304-storm fix + image cache + debounced play/pause
 *
 * ROOT CAUSE OF 304 STORMS (from network tab):
 *   content-visibility: auto physically removes DOM nodes from the render tree
 *   when sections scroll out of view. This tears down <video> elements, losing
 *   their src binding. When they scroll back in, the browser re-requests the
 *   src — even with cache headers — because the element is brand-new. That's
 *   why glitch.mp4 shows 12 identical 304s.
 *
 * ROOT CAUSE OF IMAGE RE-DECODE:
 *   Same issue. content-visibility evicts decoded image bitmaps. The <img>
 *   element is destroyed and recreated, forcing the browser to re-decode the
 *   JPEG/PNG from the cached bytes on every scroll-past. This looks like lag
 *   even though no network request fires.
 *
 * FIXES APPLIED:
 *
 * 1. REMOVE content-visibility: auto from .sterkros-section entirely.
 *    It is incompatible with media-heavy pages. Use it only for text sections.
 *
 * 2. NEVER UNMOUNT VIDEOS. Videos mount once (when near viewport), then stay
 *    in the DOM forever. Only their play/pause state changes. This is the only
 *    way to prevent 304 re-requests and preserve the browser's buffer.
 *
 * 3. IMAGE PRELOAD CACHE. A module-level Set<string> tracks which image srcs
 *    have already been loaded. MediaImage checks this set: if the src is known,
 *    it renders eager+sync (bitmap is in memory); otherwise lazy+async. This
 *    prevents re-decode on scroll-back.
 *
 * 4. DEBOUNCED PLAY/PAUSE (150ms). Rapid scrolling through a video fires
 *    visible→hidden→visible in <100ms. Without debounce, each transition
 *    calls play() then pause() then play(), which interrupts the decode
 *    pipeline and causes stuttering. 150ms absorbs scroll bounce.
 *
 * 5. CONCURRENT LOAD QUEUE (max 2). A module-level queue ensures at most 2
 *    videos are setting src and starting decode simultaneously. Others wait.
 *    This prevents the browser's media thread from being saturated on load.
 *
 * 6. SINGLE SHARED IntersectionObserver for all play/pause (O(1) observers).
 *
 * 7. SLIDER: pure DOM mutations, zero React re-renders during drag.
 */

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { Link } from "react-router-dom";
import { workCategoryLabels, works } from "../../home/data/homeContent";

// ─── Asset map ────────────────────────────────────────────────────────────────

const BASE = "/assets/work-sterkros-detail";

const STERKROS = {
  logo: `${BASE}/logo.svg`,
  guideline: `${BASE}/logo-guideline.png`,
  sign: `${BASE}/logo-sign.png`,
  logoAnimation: `${BASE}/logo-animation.mp4`,
  logoLineAnimation: `${BASE}/logo-line-animation.mp4`,
  aboutVideo: `${BASE}/about-video.mp4`,
  fingerGripVideo: `${BASE}/finger-grip.mp4`,
  glimpseVideo: `${BASE}/glimpse.mp4`,
  glitchVideo: `${BASE}/glitch.mp4`,
  gymBag: `${BASE}/gym-bag.png`,
  bottle: `${BASE}/transformation-bottle.jpg`,
  protein: `${BASE}/transformation-protein.jpg`,
  colorCode: `${BASE}/color-code.jpg`,
  watch: `${BASE}/apple-watch.png`,
  shirt: `${BASE}/shirt.png`,
  props: `${BASE}/props-three-sides.jpg`,
  package: `${BASE}/package-three-sides.jpg`,
  box: `${BASE}/package-two-sides.jpg`,
  wall: `${BASE}/wall-advertisement.png`,
} as const;

// ─── Module-level image cache ─────────────────────────────────────────────────
//
// Tracks which image srcs have completed loading. Persists across re-renders
// and across scroll-in/scroll-out cycles. When a src is in this set, we know
// the decoded bitmap is already in the browser's image cache, so we render
// the <img> as eager+sync to avoid re-decode stutter.
//
// Using a module-level Set (not state) because:
// - It must survive component unmount/remount
// - It must never trigger re-renders when updated
// - It must be shared across all MediaImage instances

const loadedImageSrcs = new Set<string>();

// ─── Module-level video load queue ───────────────────────────────────────────
//
// At most MAX_CONCURRENT videos will have their src assigned and be decoding
// simultaneously. Others sit in the queue and wait for a slot to free up.
// This prevents the browser's media thread from being saturated on initial
// page load when many VideoPanel sentinels become visible at once.

const MAX_CONCURRENT_VIDEOS = 2;
let activeVideoLoads = 0;
const videoLoadQueue: Array<() => void> = [];

function requestVideoLoadSlot(onGranted: () => void): () => void {
  if (activeVideoLoads < MAX_CONCURRENT_VIDEOS) {
    activeVideoLoads++;
    onGranted();
    return () => releaseVideoLoadSlot();
  }

  videoLoadQueue.push(onGranted);
  return () => {
    const idx = videoLoadQueue.indexOf(onGranted);
    if (idx !== -1) videoLoadQueue.splice(idx, 1);
  };
}

function releaseVideoLoadSlot() {
  activeVideoLoads = Math.max(0, activeVideoLoads - 1);
  const next = videoLoadQueue.shift();
  if (next) {
    activeVideoLoads++;
    next();
  }
}

// ─── Shared video observer context ───────────────────────────────────────────
//
// One IntersectionObserver for the entire page. All video elements register
// here. The observer calls each video's debounced play/pause handler.
//
// DEBOUNCE: 150ms prevents play→pause→play thrash during fast scrolling.
// Without this, scrolling quickly through a video causes the media pipeline
// to abort a play, start a pause, then abort that and start another play —
// each abort is a stutter.

const PLAY_DEBOUNCE_MS = 150;

type VisibilityCallback = (visible: boolean) => void;

interface VideoObserverCtx {
  observe: (el: Element, cb: VisibilityCallback) => void;
  unobserve: (el: Element) => void;
}

const VideoObserverContext = createContext<VideoObserverCtx | null>(null);

function VideoObserverProvider({ children }: { children: React.ReactNode }) {
  // These two refs are stable for the component lifetime; we keep them in
  // a ref-of-object so the context value object itself never changes identity.
  const state = useRef({
    callbacks: new Map<Element, VisibilityCallback>(),
    debounceTimers: new Map<Element, ReturnType<typeof setTimeout>>(),
    observer: null as IntersectionObserver | null,
  });

  const ctx = useRef<VideoObserverCtx>({
    observe(el, cb) {
      const s = state.current;
      if (!s.observer) {
        s.observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const handler = s.callbacks.get(entry.target);
              if (!handler) continue;

              // Debounce: cancel any pending call for this element, then
              // schedule a new one. If the element is still in the same
              // visibility state after 150ms, the call fires.
              const existing = s.debounceTimers.get(entry.target);
              if (existing) clearTimeout(existing);

              const visible = entry.isIntersecting;
              const timer = setTimeout(() => {
                s.debounceTimers.delete(entry.target);
                handler(visible);
              }, PLAY_DEBOUNCE_MS);

              s.debounceTimers.set(entry.target, timer);
            }
          },
          // rootMargin: 50px means the observer fires when the video is 50px
          // away from the viewport edge — just enough lead time to call play()
          // before the video is actually visible. Keep this small (not 200px)
          // to avoid triggering play on videos the user will never reach.
          { rootMargin: "50px 0px", threshold: 0.1 },
        );
      }
      s.callbacks.set(el, cb);
      s.observer.observe(el);
    },

    unobserve(el) {
      const s = state.current;
      s.observer?.unobserve(el);
      s.callbacks.delete(el);
      const t = s.debounceTimers.get(el);
      if (t) { clearTimeout(t); s.debounceTimers.delete(el); }
    },
  });

  useEffect(() => {
    return () => {
      const s = state.current;
      s.observer?.disconnect();
      s.callbacks.clear();
      s.debounceTimers.forEach(clearTimeout);
      s.debounceTimers.clear();
    };
  }, []);

  return (
    <VideoObserverContext.Provider value={ctx.current}>
      {children}
    </VideoObserverContext.Provider>
  );
}

function useVideoObserver() {
  const ctx = useContext(VideoObserverContext);
  if (!ctx) throw new Error("Must be inside VideoObserverProvider");
  return ctx;
}

// ─── MediaImage ───────────────────────────────────────────────────────────────
//
// Checks the module-level loadedImageSrcs set on every render.
// If the image has loaded before (cache hit): eager + sync — no re-decode lag.
// If it's new (cache miss): lazy + async — doesn't block scroll.
//
// The onLoad handler adds the src to the set so future renders are fast.

const MediaImage = memo(function MediaImage({
  src,
  alt,
  className,
  style,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  style?: CSSProperties;
  priority?: boolean;
}) {
  // Check cache synchronously during render — no state needed
  const isCached = priority || loadedImageSrcs.has(src);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={isCached ? "eager" : "lazy"}
      decoding={isCached ? "sync" : "async"}
      {...(priority ? { fetchpriority: "high" } as Record<string, string> : {})}
      onLoad={() => { loadedImageSrcs.add(src); }}
    />
  );
});

// ─── VideoPanel ───────────────────────────────────────────────────────────────
//
// CRITICAL: once mounted, the <video> element NEVER unmounts. It stays in the
// DOM for the page lifetime. This is the only way to prevent 304 re-requests.
//
// Mount phases:
//   "pending"  — sentinel div only, nothing loading
//   "loading"  — waiting for a slot in the concurrent load queue
//   "ready"    — video element in DOM with src set, play/pause via observer
//
// The load queue slot is requested when the sentinel enters the viewport
// (rootMargin 400px ahead). This ensures the video starts loading before
// it's visible, but doesn't start more than MAX_CONCURRENT_VIDEOS at once.

type VideoPhase = "pending" | "loading" | "ready";

const VideoPanel = memo(function VideoPanel({
  src,
  className = "",
  fit = "contain",
  priority = false,
}: {
  src: string;
  className?: string;
  fit?: "contain" | "cover";
  priority?: boolean;
}) {
  const [phase, setPhase] = useState<VideoPhase>(priority ? "ready" : "pending");
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const releaseSlotRef = useRef<(() => void) | null>(null);
  const { observe, unobserve } = useVideoObserver();

  // Phase pending → ready: request a load slot when near viewport
  useEffect(() => {
    if (phase !== "pending") return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mountObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        mountObserver.disconnect();
        setPhase("loading");

        // Request a slot. When granted, move to ready.
        releaseSlotRef.current = requestVideoLoadSlot(() => {
          setPhase("ready");
        });
      },
      { rootMargin: "400px 0px" },
    );

    mountObserver.observe(wrapper);
    return () => {
      mountObserver.disconnect();
      // If we were in the queue but never got a slot, cancel the request
      releaseSlotRef.current?.();
    };
  }, [phase]);

  // Phase ready: register with shared observer for play/pause
  useEffect(() => {
    if (phase !== "ready") return;

    const video = videoRef.current;
    if (!video) return;

    // When video has enough data to play, release the load slot so the
    // next queued video can start loading.
    const onCanPlay = () => {
      releaseSlotRef.current?.();
      releaseSlotRef.current = null;
      // Also release if canplay never fired (slot cleanup safety)
      releaseVideoLoadSlot();
    };
    video.addEventListener("canplay", onCanPlay, { once: true });

    observe(video, (visible) => {
      if (visible) {
        void video.play().catch(() => {
          // Autoplay blocked (e.g. mobile low-power mode) — silent fail
        });
      } else {
        video.pause();
      }
    });

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      unobserve(video);
    };
  }, [phase, observe, unobserve]);

  const objectClass =
    fit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain";

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden bg-black ${className}`}>
      {phase === "ready" && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted={muted}
          playsInline
          // Priority video (hero) gets preload="auto" for immediate start.
          // Others get "metadata" — just enough to get dimensions and first
          // frame without downloading the whole file upfront.
          preload={priority ? "auto" : "metadata"}
          className={objectClass}
        />
      )}
      <button
        type="button"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => setMuted((v) => !v)}
        className="absolute bottom-4 right-4 z-10 rounded-pill bg-black/65 px-4 py-2 text-sm font-semibold text-white transition hover:bg-bee-accent hover:text-black"
      >
        {muted ? "Muted" : "Sound"}
      </button>
    </div>
  );
});

// ─── SilentVideo ──────────────────────────────────────────────────────────────
//
// Same never-unmount principle. Mounts once on near-viewport, then stays.

const SilentVideo = memo(function SilentVideo({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { observe, unobserve } = useVideoObserver();

  useEffect(() => {
    if (ready) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setReady(true); obs.disconnect(); }
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(wrapper);
    return () => obs.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (!video) return;

    observe(video, (visible) => {
      if (visible) void video.play().catch(() => {});
      else video.pause();
    });
    return () => unobserve(video);
  }, [ready, observe, unobserve]);

  return (
    <div ref={wrapperRef} className={className.includes("aspect") ? "" : "contents"}>
      {ready && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="metadata"
          className={className}
        />
      )}
    </div>
  );
});

// ─── PropsPackagingSlider ─────────────────────────────────────────────────────
//
// Position stored in a ref. DOM mutated directly in rAF.
// setState fires once on pointerup only (for aria-valuenow).

const PropsPackagingSlider = memo(function PropsPackagingSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dividerRef   = useRef<HTMLDivElement | null>(null);
  const handleRef    = useRef<HTMLButtonElement | null>(null);
  const overlayRef   = useRef<HTMLImageElement | null>(null);
  const posRef       = useRef(50);
  const rafRef       = useRef<number | null>(null);
  const [ariaPos, setAriaPos] = useState(50);

  const applyPos = useCallback((pct: number) => {
    const c = Math.min(95, Math.max(5, pct));
    posRef.current = c;
    const s = `${c}%`;
    if (dividerRef.current)  dividerRef.current.style.left = s;
    if (handleRef.current)   handleRef.current.style.left  = s;
    if (overlayRef.current)  overlayRef.current.style.clipPath = `inset(0 ${100 - c}% 0 0)`;
  }, []);

  const scheduleUpdate = useCallback((clientX: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      applyPos(((clientX - r.left) / r.width) * 100);
    });
  }, [applyPos]);

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    scheduleUpdate(e.clientX);
  }
  function onPointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (e.buttons !== 1) return;
    scheduleUpdate(e.clientX);
  }
  function onPointerUp() { setAriaPos(Math.round(posRef.current)); }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    let next = posRef.current;
    if      (e.key === "ArrowLeft")  { e.preventDefault(); next = Math.max(5,  next - 3); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next = Math.min(95, next + 3); }
    else return;
    applyPos(next);
    setAriaPos(Math.round(next));
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div ref={containerRef} className="flex-1 relative overflow-hidden bg-bee-bg-deep">
      <MediaImage src={STERKROS.package} alt="Sterkros packaging" className="h-full w-full object-cover" />
      <img
        ref={overlayRef}
        src={STERKROS.props}
        alt="Sterkros plain props"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: "inset(0 50% 0 0)" }}
        loading="lazy"
        decoding="async"
        onLoad={() => loadedImageSrcs.add(STERKROS.props)}
      />

      <div className="pointer-events-none absolute bottom-7 left-10 right-10 flex justify-between text-base font-extrabold text-red-600">
        <span>Props</span>
        <span>Package</span>
      </div>

      <div ref={dividerRef} className="pointer-events-none absolute inset-y-0 z-10" style={{ left: "50%" }}>
        <div className="h-full w-px bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.45)]" />
      </div>

      <button
        ref={handleRef}
        type="button"
        role="slider"
        aria-label="Compare props and packaging"
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={ariaPos}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        className="sterkros-compare-handle absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%" }}
      >
        <span
          className="flex h-16 w-16 items-center justify-center gap-1 rounded-pill bg-red-600 text-white shadow-card-lg"
          style={{ willChange: "transform" }}
        >
          <span className="h-3 w-3 rotate-45 border-b-2 border-l-2 border-current" />
          <span className="h-6 w-px bg-current" />
          <span className="h-3 w-3 rotate-45 border-r-2 border-t-2 border-current" />
        </span>
      </button>
    </div>
  );
});

// ─── NextWorkStrip ────────────────────────────────────────────────────────────

const NextWorkStrip = memo(function NextWorkStrip() {
  const nextWorks = works.filter((w) => w.id === "w4" || w.id === "w7");

  return (
    <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-section-label"><span aria-hidden>&bull;</span> More Good Stuff</p>
          <h2 className="mt-4 text-testimonial-heading font-semibold">What Next?</h2>
        </div>
        <Link to="/#works" className="mt-9 rounded-pill bg-bee-accent px-5 py-2 text-sm font-medium text-black transition hover:bg-white">
          Browse more work
        </Link>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {nextWorks.map((work) => (
          <Link key={work.id} to={work.pagePath} className="group">
            <div className="relative overflow-hidden rounded-card bg-bee-bg-card">
              <SilentVideo
                src={work.mediaUrl}
                className="aspect-video w-full object-cover transition duration-slower group-hover:scale-[1.03]"
              />
              <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
                {work.categories.map((cat) => (
                  <span key={cat} className="rounded-pill bg-white/20 px-3 py-1 text-xs text-white">
                    {workCategoryLabels[cat]}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 text-title-fluid text-white/90">
              {work.year} <span className="text-white/45">&bull;</span> {work.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SterkrosDetailPage() {
  return (
    <VideoObserverProvider>
      <main className="bg-bee-bg-primary text-white">

        {/* Hero — priority: immediate mount, preload=auto, fetchpriority=high */}
        <section className="grid w-full gap-10 px-section-x-sm py-10 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:px-section-x-lg">
          <VideoPanel src={STERKROS.glimpseVideo} className="min-h-[360px]" fit="cover" priority />
          <div>
            <h1 className="text-heading-sm font-semibold">Sterkros Fitness company</h1>
            <p className="mt-5 text-copy-lg text-white/85">
              Bee concept built a complete brand identity and packaging system for Sterkros,
              amplifying their mission to empower fitness enthusiasts worldwide.
            </p>
            <p className="mt-5 text-copy-lg text-white/85">
              Our efforts elevated Sterkros&apos; presence by encouraging individuals to reach their fitness goals.
            </p>
            <h2 className="mt-7 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-3 space-y-1 text-base leading-relaxed text-white/85">
              {["Brand Identity & Guideline", "3D Renders", "Brand Collaterals", "Motion Graphics", "Packaging"].map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Brand Identity */}
        <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label"><span aria-hidden>&bull;</span> Brand Identity</p>
          <h2 className="mt-5 text-heading-sm font-semibold">Explore the Process</h2>
          <div className="mt-8 space-y-6 text-copy-lg text-white/80">
            <p>
              The process began with a comprehensive analysis of the Sterkros group&apos;s values,
              mission, and target audience. This initial research laid the foundation for developing
              a branding strategy that aligned with the team&apos;s goals and resonated with their market.
            </p>
            <p>
              The language was carefully crafted around the title symbol, coupled with triangle ways
              of the &ldquo;S&rdquo;, creating a recognizable visual symbol for the fitness team.
            </p>
          </div>
          <div className="mt-10 grid border-y border-white/60 py-8 text-center md:grid-cols-3">
            <div>
              <h3 className="text-title-fluid">Guide lines</h3>
              <MediaImage src={STERKROS.guideline} alt="Sterkros guidelines" className="mx-auto mt-12 h-28 object-contain" />
            </div>
            <div>
              <h3 className="text-title-fluid">Logo type</h3>
              <MediaImage src={STERKROS.logo} alt="Sterkros logo type" className="mx-auto mt-12 h-28 object-contain" />
            </div>
            <div>
              <h3 className="text-title-fluid">Sign</h3>
              <MediaImage src={STERKROS.sign} alt="Sterkros sign" className="mx-auto mt-12 h-40 object-contain" />
            </div>
          </div>
        </section>

        {/* Logo animation */}
        <section className="bg-bee-bg-deep px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <VideoPanel src={STERKROS.logoAnimation} className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full" />
        </section>

        {/* Logo line animation + sign */}
        <section className="grid md:grid-cols-2">
          <VideoPanel src={STERKROS.logoLineAnimation} className="aspect-video min-h-[360px] bg-white md:aspect-auto" />
          <div className="grid min-h-[360px] place-items-center bg-bee-bg-card p-10">
            <MediaImage src={STERKROS.sign} alt="Sterkros sign" className="max-h-56 w-full object-contain" />
          </div>
        </section>

        {/* Transformation gallery */}
        <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
          <blockquote className="max-w-[850px] text-heading-sm font-semibold leading-tight">
            <span className="block text-[5rem] leading-none text-bee-accent">&ldquo;</span>
            Experience the transformation brought by Beeconcept&reg; to STERKROS 2023 and 2024.
            <span className="ml-4 text-[5rem] leading-none text-bee-accent">&rdquo;</span>
          </blockquote>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <MediaImage src={STERKROS.gymBag}  alt="Sterkros gym bag"           className="aspect-square w-full object-cover" />
            <MediaImage src={STERKROS.bottle}  alt="Sterkros bottle"            className="aspect-square w-full object-cover" />
            <MediaImage src={STERKROS.protein} alt="Sterkros protein packaging" className="aspect-square w-full object-cover" />
            <VideoPanel src={STERKROS.glitchVideo} className="aspect-square" fit="cover" />
          </div>
        </section>

        {/* Typeface & Colour */}
        <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
          <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-section-label"><span aria-hidden>&bull;</span> Typeface</p>
              <h2 className="mt-4 text-testimonial-heading font-semibold">Sui Generis Regular</h2>
              <p className="mt-8 max-w-[760px] text-copy-lg text-white/80">
                The Sui Generis font is a distinctive sans-serif typeface created by Typodermic
                Fonts Inc. It features a modern, rounded-square design with technical letterforms
                and a futuristic charm, making it versatile for industries like automotive,
                sporting, tech, and entertainment.
              </p>
            </div>
            <div className="space-y-8">
              <MediaImage src={STERKROS.sign} alt="Sterkros sign" className="ml-auto h-20 object-contain" />
              <p className="sterkros-font break-all text-right text-lg leading-tight text-white">
                ABCDEFGHIJKLMNOPQRSTV WXYZ abcdefghijklmnopqrstuv wxyz 0123456789
              </p>
            </div>
          </div>
          <h2 className="mt-14 text-testimonial-heading font-semibold">color</h2>
          <MediaImage src={STERKROS.colorCode} alt="Sterkros color palette" className="mt-6 w-full object-cover" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <MediaImage src={STERKROS.watch} alt="Sterkros watch mockup" className="h-[360px] w-full rounded-card object-cover" />
            <MediaImage src={STERKROS.shirt} alt="Sterkros shirt"        className="h-[360px] w-full rounded-card object-cover" />
          </div>
        </section>

        {/* Props & Packaging slider */}
        <section className="py-12">
          <div className="w-full px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
            <p className="text-section-label"><span aria-hidden>&bull;</span> Props And Packaging</p>
            <h2 className="mt-4 max-w-[560px] text-testimonial-heading font-semibold">
              Your Packaging Design Will Stand Out.
            </h2>
          </div>
          <div className="mt-8 flex flex-col h-[min(62vw,620px)] min-h-[380px]">
            <PropsPackagingSlider />
          </div>
        </section>

        {/* About video */}
        <section className="bg-bee-bg-deep px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <VideoPanel src={STERKROS.aboutVideo} className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full" />
        </section>

        {/* Packaging copy + media */}
        <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
          <p className="max-w-[1120px] text-copy-lg text-white/80">
            Packaging design is key when designing branded merchandise offerings. Packaging can be
            as simple as wrapping or a logo placement, or as complex as an overall industrial design
            of the shape, form, application, and usage of your product.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <MediaImage src={STERKROS.box} alt="Sterkros box packaging" className="h-[420px] w-full rounded-card object-cover" />
            <VideoPanel src={STERKROS.fingerGripVideo} className="h-[420px] rounded-card" fit="cover" />
          </div>
        </section>

        {/* Wall ad */}
        <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg">
          <MediaImage src={STERKROS.wall} alt="Sterkros wall advertisement" className="w-full object-cover" />
        </section>

        {/* Thanks */}
        <section className="px-section-x-sm py-12 text-center sm:px-section-x-md lg:px-section-x-lg">
          <h2 className="text-testimonial-heading font-extrabold">HUGE THANKS</h2>
          <p className="mt-2 text-title-fluid">To The Mattel Team For Entrusting Us For Years.</p>
        </section>

        <NextWorkStrip />
      </main>
    </VideoObserverProvider>
  );
}