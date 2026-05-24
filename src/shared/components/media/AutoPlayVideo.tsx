import type { VideoHTMLAttributes } from "react";

type AutoPlayVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "autoPlay" | "loop" | "muted" | "playsInline"
>;

export function AutoPlayVideo(props: AutoPlayVideoProps) {
  return <video {...props} autoPlay loop muted playsInline />;
}
