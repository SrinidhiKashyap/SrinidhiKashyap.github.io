import { memo, useState, useEffect } from "react";
import { classNames } from "../../../shared/lib/classNames";
import type { ServiceItem } from "../data/serviceContent";

type ServicePointListProps = {
  service: ServiceItem;
  activePoints: Set<string>;
  onActivatePoint: (pointKey: string) => void;
};

/**
 * ServicePointList
 *
 * Renders the bullet-point list for a single service section.
 * Each point can be activated (highlighted) on hover/focus/tap.
 * Supports right-aligned layout for alternating service sections.
 */
export const ServicePointList = memo(function ServicePointList({
  service,
  activePoints,
  onActivatePoint,
}: ServicePointListProps) {
  const isRightAligned = service.layout === "left";
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <ul
      className={classNames(
        "mt-6 space-y-4 text-base text-white/60 md:mt-8 md:space-y-5 md:text-lg",
        isRightAligned && "md:text-right",
        // On mobile, always left-align for better readability
        "text-left",
      )}
    >
      {service.points.map((point) => {
        const pointKey = `${service.name}-${point}`;
        const isActive = activePoints.has(pointKey);

        return (
          <li key={point}>
            <button
              type="button"
              onMouseEnter={() => !isTouchDevice && onActivatePoint(pointKey)}
              onFocus={() => onActivatePoint(pointKey)}
              onClick={() => isTouchDevice && onActivatePoint(pointKey)}
              className={classNames(
                "inline-flex items-center gap-3 text-left transition duration-slow hover:text-white focus-visible:text-white focus-visible:outline-none touch-target tap-highlight-transparent",
                isRightAligned && "md:justify-end md:text-right",
                isActive && "text-white",
              )}
            >
              {isRightAligned ? (
                <>
                  <span>{point}</span>
                  <span className="w-4 text-bee-accent">{isActive ? "~" : ""}</span>
                </>
              ) : (
                <>
                  <span className="w-4 text-bee-accent">{isActive ? "~" : ""}</span>
                  <span>{point}</span>
                </>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
});
