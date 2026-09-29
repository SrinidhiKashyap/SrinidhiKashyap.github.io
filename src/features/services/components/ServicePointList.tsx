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
 * The `~` tilde marker appears white on hover with a fast transition.
 * Tiles are wrapped in buttons for keyboard accessibility.
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
        "space-y-1 text-[12px] font-light sm:space-y-2 md:space-y-3 md:text-lg lg:space-y-4 lg:text-xl",
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
                "transition-all duration-200 ease-out",
                revealedPoints.has(point) ? "text-white opacity-100" : "text-bee-accent opacity-0",
              )}
            >
              ~
            </span>
            <span
              className={classNames(
                "transition-colors duration-200 ease-out",
                revealedPoints.has(point) ? "text-white" : "text-white/60",
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
