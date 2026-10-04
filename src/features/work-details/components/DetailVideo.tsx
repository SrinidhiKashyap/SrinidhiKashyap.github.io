import { memo, useEffect, useRef, useState } from "react";
import { useVideoObserver } from "./DetailVideoProvider";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DetailVideoProps {
  /** Video source URL */
  src: string;
  /** Tailwind or CSS class string applied to the video wrapper. Defaults to "". */
  className?: string;
  /** Object-fit behaviour. Defaults to "cover". */
  fit?: "contain" | "cover";
  /** Optional poster image URL */
  poster?: string;
  /** If true, loads without lazy scroll detection. Defaults to false. */
  priority?: boolean;
  /** If true, shows a mute/unmute toggle button. Defaults to false. */
  muteToggle?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Scroll-aware video player for detail pages.
 *
 * Videos automatically pause when scrolled out of view (via
 * `IntersectionObserver`) and resume when scrolled back in. Supports
 * lazy initialisation — the `<video>` element is only created when the
 * component scrolls near the viewport.
 *
 * @example
 * ```tsx
 * <DetailVideo src="/video.mp4" className="aspect-video" fit="cover" />
 * ```
 */
export const DetailVideo = memo(function DetailVideo({
  src,
  className = "",
  fit = "cover",
  poster,
  priority = false,
  muteToggle = false,
}: DetailVideoProps) {
  const [ready, setReady] = useState(priority);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { observe, unobserve } = useVideoObserver();

  // Lazy-init: create the <video> element only when the wrapper scrolls near
  useEffect(() => {
    if (ready) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [ready]);

  // Pause/resume based on viewport visibility once video is ready
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
          preload={priority ? "metadata" : "none"}
          className={
            fit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain"
          }
        />
      )}

      {muteToggle && (
        <button
          type="button"
          aria-label={muted ? "Unmute video" : "Mute video"}
          aria-pressed={!muted}
          title={muted ? "Unmute video" : "Mute video"}
          onClick={() => setMuted((value) => !value)}
          className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/65 text-white transition hover:bg-bee-accent hover:text-black"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H3v6h3l5 4z" />
            {muted ? (
              <path d="m16 9 5 6m0-6-5 6" />
            ) : (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M19 5a10 10 0 0 1 0 14" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
});
