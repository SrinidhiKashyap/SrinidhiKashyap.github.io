import { memo, useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";

type AutoPlayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "loop" | "muted" | "playsInline"
>;

/**
 * AutoPlayVideo
 *
 * A memoized `<video>` wrapper that lazy-loads the `src` attribute only when
 * the element is near the viewport (rootMargin 180px). The video auto-plays,
 * loops, and is muted by default — ideal for decorative background media.
 *
 * Frees memory by removing `src` when scrolled out of view (not just pausing).
 */
function AutoPlayVideoComponent({ src, preload = "none", ...props }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let unloaded = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (unloaded) {
            video.src = src;
            unloaded = false;
          }
          setLoadedSrc(src);
          void video.play().catch(() => {});
        } else {
          video.pause();
          video.removeAttribute("src");
          video.load();
          unloaded = true;
          setLoadedSrc(undefined);
        }
      },
      { rootMargin: "180px 0px", threshold: 0.05 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      {...props}
      ref={videoRef}
      src={loadedSrc}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
    />
  );
}

export const AutoPlayVideo = memo(AutoPlayVideoComponent);
