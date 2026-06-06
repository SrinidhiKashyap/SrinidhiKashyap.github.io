import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { Link } from "react-router-dom";
import { workCategoryLabels, works } from "../../home/data/homeContent";

type VisibilityCallback = (visible: boolean) => void;

const loadedImageSrcs = new Set<string>();

const VideoObserverContext = createContext<{
  observe: (el: Element, cb: VisibilityCallback) => void;
  unobserve: (el: Element) => void;
} | null>(null);

export function DetailVideoProvider({ children }: { children: ReactNode }) {
  const state = useRef({
    callbacks: new Map<Element, VisibilityCallback>(),
    debounceTimers: new Map<Element, ReturnType<typeof setTimeout>>(),
    observer: null as IntersectionObserver | null,
  });

  const ctx = useRef({
    observe(el: Element, cb: VisibilityCallback) {
      const s = state.current;
      if (!s.observer) {
        s.observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const handler = s.callbacks.get(entry.target);
              if (!handler) continue;

              const existing = s.debounceTimers.get(entry.target);
              if (existing) clearTimeout(existing);

              const visible = entry.isIntersecting;
              const timer = setTimeout(() => {
                s.debounceTimers.delete(entry.target);
                handler(visible);
              }, 150);
              s.debounceTimers.set(entry.target, timer);
            }
          },
          { rootMargin: "80px 0px", threshold: 0.1 },
        );
      }
      s.callbacks.set(el, cb);
      s.observer.observe(el);
    },
    unobserve(el: Element) {
      const s = state.current;
      s.observer?.unobserve(el);
      s.callbacks.delete(el);
      const timer = s.debounceTimers.get(el);
      if (timer) {
        clearTimeout(timer);
        s.debounceTimers.delete(el);
      }
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
  if (!ctx) throw new Error("DetailVideo must be rendered inside DetailVideoProvider");
  return ctx;
}

export const DetailImage = memo(function DetailImage({
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
  const isCached = priority || loadedImageSrcs.has(src);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={isCached ? "eager" : "lazy"}
      decoding={isCached ? "sync" : "async"}
      {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
      onLoad={() => loadedImageSrcs.add(src)}
    />
  );
});

export const DetailVideo = memo(function DetailVideo({
  src,
  className = "",
  fit = "cover",
  poster,
  priority = false,
  playOverlay = false,
  muteToggle = false,
}: {
  src: string;
  className?: string;
  fit?: "contain" | "cover";
  poster?: string;
  priority?: boolean;
  playOverlay?: boolean;
  muteToggle?: boolean;
}) {
  const [ready, setReady] = useState(priority);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { observe, unobserve } = useVideoObserver();

  useEffect(() => {
    if (ready) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready || !videoRef.current) return;
    const video = videoRef.current;

    observe(video, (visible) => {
      if (visible) void video.play().catch(() => {});
      else video.pause();
    });

    return () => unobserve(video);
  }, [observe, ready, unobserve]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden bg-black ${className}`}>
      {ready && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop
          muted={muted}
          playsInline
          preload={priority ? "auto" : "metadata"}
          className={fit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain"}
        />
      )}

      {playOverlay && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="grid h-20 w-20 place-items-center rounded-pill border-[6px] border-white text-white">
            <span className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-current" />
          </span>
        </div>
      )}

      {muteToggle && (
        <button
          type="button"
          aria-label={muted ? "Unmute video" : "Mute video"}
          onClick={() => setMuted((value) => !value)}
          className="absolute bottom-4 right-4 z-10 rounded-pill bg-black/65 px-4 py-2 text-sm font-semibold text-white transition hover:bg-bee-accent hover:text-black"
        >
          {muted ? "Muted" : "Sound"}
        </button>
      )}
    </div>
  );
});

export const CompareSlider = memo(function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = "Props",
  afterLabel = "Package",
  className = "",
  fit = "cover",
  handleColor = "#0b2a4c",
  labelColor = "text-black",
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  fit?: "contain" | "cover";
  handleColor?: string;
  labelColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null);
  const posRef = useRef(50);
  const rafRef = useRef<number | null>(null);
  const [ariaPos, setAriaPos] = useState(50);
  const objectClass = fit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain";

  const applyPos = useCallback((pct: number) => {
    const clamped = Math.min(94, Math.max(6, pct));
    posRef.current = clamped;
    const pos = `${clamped}%`;
    if (dividerRef.current) dividerRef.current.style.left = pos;
    if (handleRef.current) handleRef.current.style.left = pos;
    if (overlayRef.current) overlayRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
  }, []);

  const scheduleUpdate = useCallback(
    (clientX: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        applyPos(((clientX - rect.left) / rect.width) * 100);
      });
    },
    [applyPos],
  );

  function onPointerDown(e: PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    scheduleUpdate(e.clientX);
  }

  function onPointerMove(e: PointerEvent<HTMLButtonElement>) {
    if (e.buttons !== 1) return;
    scheduleUpdate(e.clientX);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    let next = posRef.current;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next -= 3;
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next += 3;
    } else {
      return;
    }
    applyPos(next);
    setAriaPos(Math.round(posRef.current));
  }

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className={`relative h-full overflow-hidden ${className}`}>
      <DetailImage src={before} alt={beforeAlt} className={objectClass} />
      <img
        ref={overlayRef}
        src={after}
        alt={afterAlt}
        className={`absolute inset-0 ${objectClass}`}
        style={{ clipPath: "inset(0 50% 0 0)" }}
        loading="lazy"
        decoding="async"
        onLoad={() => loadedImageSrcs.add(after)}
      />

      <div className={`pointer-events-none absolute bottom-6 left-10 right-10 flex justify-between text-sm font-extrabold ${labelColor}`}>
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>

      <div ref={dividerRef} className="pointer-events-none absolute inset-y-0 z-10" style={{ left: "50%" }}>
        <div className="h-full w-px bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.45)]" />
      </div>

      <button
        ref={handleRef}
        type="button"
        role="slider"
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        aria-valuemin={6}
        aria-valuemax={94}
        aria-valuenow={ariaPos}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setAriaPos(Math.round(posRef.current))}
        onKeyDown={onKeyDown}
        className="work-detail-compare-handle absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%" }}
      >
        <span className="grid h-16 w-16 place-items-center rounded-pill text-white shadow-card-lg" style={{ backgroundColor: handleColor }}>
          <span className="text-xl font-black">&lt;&gt;</span>
        </span>
      </button>
    </div>
  );
});

export function NextWorkStrip({
  workIds,
}: {
  workIds: string[];
}) {
  const nextWorks = works.filter((work) => workIds.includes(work.id));

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
              <DetailVideo
                src={work.mediaUrl}
                className="aspect-video w-full transition duration-slower group-hover:scale-[1.03]"
                fit="cover"
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
}
