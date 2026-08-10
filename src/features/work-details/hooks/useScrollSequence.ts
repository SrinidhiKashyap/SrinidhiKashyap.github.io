import { useEffect, useRef, useState, type RefObject } from "react";

/** Maps the scroll distance through a tall section to a frame index. */
export function useScrollSequence(
  sectionRef: RefObject<HTMLElement | null>,
  frameCount: number,
): number {
  const [frameIndex, setFrameIndex] = useState(0);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || frameCount < 2) return;

    let animationFrame = 0;

    const updateFrame = () => {
      animationFrame = 0;
      const bounds = section.getBoundingClientRect();
      const headerOffset = 76;
      const sectionTop = window.scrollY + bounds.top - headerOffset;
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight + headerOffset, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / scrollDistance));
      const nextFrame = Math.min(frameCount - 1, Math.floor(progress * frameCount));

      if (nextFrame !== frameIndexRef.current) {
        frameIndexRef.current = nextFrame;
        setFrameIndex(nextFrame);
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateFrame);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [frameCount, sectionRef]);

  return frameIndex;
}
