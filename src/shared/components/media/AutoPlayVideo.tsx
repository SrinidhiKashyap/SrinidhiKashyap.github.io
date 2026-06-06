import { memo, useEffect, useRef, useState } from "react";
import type { VideoHTMLAttributes } from "react";

type AutoPlayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "loop" | "muted" | "playsInline"
>;

function AutoPlayVideoComponent({ src, preload = "metadata", ...props }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadedSrc(src);
          void video.play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.05 },
    );

    observer.observe(video);

    return () => observer.disconnect();
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
