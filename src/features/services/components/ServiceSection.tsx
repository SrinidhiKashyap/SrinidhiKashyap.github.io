import { memo } from "react";
import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import { classNames } from "../../../shared/lib/classNames";
import { LetterReveal } from "./LetterReveal";
import { ServicePointList } from "./ServicePointList";
import type { ServiceItem } from "../data/serviceContent";

type ServiceSectionProps = {
  service: ServiceItem;
  index: number;
  progress: number;
  setRef: (node: HTMLElement | null) => void;
};

/**
 * ServiceSection
 *
 * A single service row on the /service page.
 * Two-row structure, alternating side based on `service.layout`:
 *   left  → title + video:    title left,  video right
 *           summary + points: summary left, points right
 *   right → title + video:    video left,  title right
 *           summary + points: points left,  summary right (text-right)
 *
 * Rows never wrap / stack — children are ordered explicitly in the DOM so the
 * mirroring is deterministic at every breakpoint (matches the design mockups).
 */
export const ServiceSection = memo(function ServiceSection({
  service,
  index,
  progress,
  setRef,
}: ServiceSectionProps) {
  const isRight = service.layout === "right";

  // Split on "/" so the separator can be enlarged (e.g. "Ui/Ux").
  const [nameBefore, nameAfter] = service.name.split("/");

  const title = (
    <h2 className="text-4xl font-light leading-none text-white md:text-6xl lg:text-8xl">
      {nameBefore}
      {nameAfter !== undefined && <span className="text-5xl md:text-6xl lg:text-9xl">/</span>}
      {nameAfter}
    </h2>
  );

  const video = (
    <AutoPlayVideo
      src={service.videoSrc}
      disablePictureInPicture
      className="h-28 w-28 shrink-0 object-cover sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-80 lg:w-80"
    />
  );

  const summary = (
    <p className="text-[13px] font-light leading-loose text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl">
      <LetterReveal progress={Math.max(0, progress - 0.18) / 0.82}>
        {(service.summaryLines ?? [service.summary]).join("\n")}
      </LetterReveal>
    </p>
  );

  const points = <ServicePointList points={service.points} />;

  return (
    <section ref={setRef} data-service-index={index} className="border-t border-white/10">
      <div className="py-6 md:py-8 lg:py-10 xl:py-14">
        {/* ── Row 1 — service name + video ── */}
        <div className="flex items-center justify-between gap-6">
          {isRight ? (
            <>
              {video}
              {title}
            </>
          ) : (
            <>
              {title}
              {video}
            </>
          )}
        </div>

        {/* ── Row 2 — summary + point list ── */}
        <div
          className={classNames(
            "flex items-start justify-between gap-4",
            service.contentClassName,
          )}
        >
          {isRight ? (
            <>
              <div className="flex-1">{points}</div>
              <div className="flex-1 text-right">{summary}</div>
            </>
          ) : (
            <>
              <div className="flex-1">{summary}</div>
              <div className="flex-1">
                <ServicePointList
                  points={service.points}
                  justifyRight
                  className="ml-auto w-28 sm:w-36 md:w-48 lg:w-80"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
});
