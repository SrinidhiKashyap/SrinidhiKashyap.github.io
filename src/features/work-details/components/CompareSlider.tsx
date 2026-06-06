import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { DetailImage } from "./DetailImage";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CompareSliderProps {
  /** Image shown on the left (or top) side of the comparison */
  before: string;
  /** Image shown on the right (or bottom) side of the comparison */
  after: string;
  /** Alt text for the "before" image */
  beforeAlt: string;
  /** Alt text for the "after" image */
  afterAlt: string;
  /** Label displayed on the before side. Defaults to "Props". */
  beforeLabel?: string;
  /** Label displayed on the after side. Defaults to "Package". */
  afterLabel?: string;
  /** Additional class names for the container */
  className?: string;
  /** Object-fit behaviour. Defaults to "cover". */
  fit?: "contain" | "cover";
  /** Background colour of the circular drag handle. Defaults to "#0b2a4c". */
  handleColor?: string;
  /** Tailwind text colour class for the labels. Defaults to "text-black". */
  labelColor?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Interactive before/after image comparison slider.
 *
 * Drag the circular handle or use the arrow keys to reveal the "after"
 * image over the "before" image. Accessible via keyboard and pointer
 * interactions.
 *
 * @example
 * ```tsx
 * <CompareSlider
 *   before="/before.jpg"
 *   after="/after.jpg"
 *   beforeAlt="Original"
 *   afterAlt="Redesigned"
 *   className="aspect-video"
 * />
 * ```
 */
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
}: CompareSliderProps) {
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
      />

      <div className={`pointer-events-none absolute bottom-6 left-10 right-10 flex justify-between text-sm font-extrabold ${labelColor}`}>
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
      </div>

      {/* Vertical divider line */}
      <div ref={dividerRef} className="pointer-events-none absolute inset-y-0 z-10" style={{ left: "50%" }}>
        <div className="h-full w-px bg-white/80 shadow-[0_0_24px_rgba(255,255,255,0.45)]" />
      </div>

      {/* Drag handle */}
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
          <span className="text-xl font-black">{`< >`}</span>
        </span>
      </button>
    </div>
  );
});