import { memo } from "react";
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
 * Each point can be activated (highlighted) on hover/focus.
 * Supports right-aligned layout for alternating service sections.
 */
export const ServicePointList = memo(function ServicePointList({ service, activePoints, onActivatePoint }: ServicePointListProps) {
  const isRightAligned = service.layout === "left";

  return (
    <ul
      className={classNames(
        "mt-8 space-y-5 text-base text-white/60 md:text-lg",
        isRightAligned && "text-right",
      )}
    >
      {service.points.map((point) => {
        const pointKey = `${service.name}-${point}`;
        const isActive = activePoints.has(pointKey);

        return (
          <li key={point}>
            <button
              type="button"
              onMouseEnter={() => onActivatePoint(pointKey)}
              onFocus={() => onActivatePoint(pointKey)}
              className={classNames(
                "inline-flex items-center gap-3 text-left transition duration-slow hover:text-white focus-visible:text-white focus-visible:outline-none",
                isRightAligned && "justify-end text-right",
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