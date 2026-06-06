import { useEffect, useRef, useState } from "react";
import { services } from "../data/serviceContent";

/**
 * useServiceRevealProgress
 *
 * Tracks scroll progress for each service section on the /service page.
 * Returns an array of progress values (0–1) for each service, and a ref
 * array that sections should attach via their `ref` prop.
 *
 * Progress is calculated based on the section's distance from the viewport midpoint.
 * At 50% viewport height the section starts revealing, reaching full reveal at 15%.
 */
export function useServiceRevealProgress() {
  const [progresses, setProgresses] = useState<number[]>(() => services.map(() => 0));
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    function updateProgress() {
      const viewportHeight = window.innerHeight || 1;

      setProgresses(
        sectionRefs.current.map((section) => {
          if (!section) return 0;

          const rect = section.getBoundingClientRect();
          const revealStart = viewportHeight * 0.5;
          const revealEnd = viewportHeight * 0.15;
          const progress = (revealStart - rect.top) / (revealStart - revealEnd);

          return Math.min(1, Math.max(0, progress));
        }),
      );
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return { progresses, sectionRefs };
}