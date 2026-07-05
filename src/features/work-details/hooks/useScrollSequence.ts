import { useEffect, useRef, useState, type RefObject } from "react";

const WHEEL_THRESHOLD = 24;
const STEP_COOLDOWN_MS = 220;

/** Changes one frame per wheel step, then releases scrolling at either end. */
export function useScrollSequence(
  sectionRef: RefObject<HTMLElement | null>,
  frameCount: number,
): number {
  const [frameIndex, setFrameIndex] = useState(0);
  const frameIndexRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const directionRef = useRef(0);
  const lastStepAtRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleWheel(event: WheelEvent) {
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      const canAdvance = direction > 0 && frameIndexRef.current < frameCount - 1;
      const canReverse = direction < 0 && frameIndexRef.current > 0;
      if (!canAdvance && !canReverse) {
        accumulatedDeltaRef.current = 0;
        return;
      }

      event.preventDefault();

      if (directionRef.current !== direction) {
        directionRef.current = direction;
        accumulatedDeltaRef.current = 0;
      }

      accumulatedDeltaRef.current += Math.abs(event.deltaY);
      const now = window.performance.now();
      if (
        accumulatedDeltaRef.current < WHEEL_THRESHOLD
        || now - lastStepAtRef.current < STEP_COOLDOWN_MS
      ) return;

      const nextFrame = Math.min(
        Math.max(frameIndexRef.current + direction, 0),
        frameCount - 1,
      );

      frameIndexRef.current = nextFrame;
      accumulatedDeltaRef.current = 0;
      lastStepAtRef.current = now;
      setFrameIndex(nextFrame);
    }

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [frameCount, sectionRef]);

  return frameIndex;
}
