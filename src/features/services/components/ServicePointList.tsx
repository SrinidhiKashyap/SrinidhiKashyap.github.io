import { memo, useState } from "react";
import { classNames } from "../../../shared/lib/classNames";
import type { ServiceItem } from "../data/serviceContent";

type ServicePointListProps = {
  points: ServiceItem["points"];
  /** Right-justify the point rows (used when the list sits in the right column). */
  justifyRight?: boolean;
  className?: string;
};

/**
 * ServicePointList
 *
 * Renders the bullet-point list for a single service section.
 * The `~` tilde marker is always visible in bee-accent and flips to white
 * on hover (slow 2s ease), while the label transitions to white quickly
 * (500ms ease). Tiles are wrapped in buttons for keyboard accessibility.
 */
export const ServicePointList = memo(function ServicePointList({
  points,
  justifyRight = false,
  className,
}: ServicePointListProps) {
  const [revealedPoints, setRevealedPoints] = useState<Set<string>>(() => new Set());

  function revealPoint(point: string) {
    setRevealedPoints((current) => {
      if (current.has(point)) return current;
      return new Set(current).add(point);
    });
  }

  return (
    <ul
      className={classNames(
        "text-[13px] md:text-xl lg:text-2xl space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 xl:space-y-6",
        className,
      )}
    >
      {points.map((point) => (
        <li
          key={point}
          className={classNames(
            "flex items-center gap-2",
            justifyRight && "justify-end",
          )}
        >
          <button
            type="button"
            onMouseEnter={() => revealPoint(point)}
            onFocus={() => revealPoint(point)}
            onClick={() => revealPoint(point)}
            className="group inline-flex items-center gap-2 text-left transition duration-slow focus-visible:outline-none touch-target tap-highlight-transparent"
          >
            <span
              className={classNames(
                "text-bee-accent transition-all duration-[2000ms] ease-in-out",
                revealedPoints.has(point) ? "opacity-100 text-white" : "opacity-0",
              )}
            >
              ~
            </span>
            <span
              className={classNames(
                "text-white/60 transition-all duration-500 ease-in-out",
                revealedPoints.has(point) && "text-white",
              )}
            >
              {point}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
});
