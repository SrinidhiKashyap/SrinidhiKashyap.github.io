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
  activePoints: Set<string>;
  onActivatePoint: (pointKey: string) => void;
};

/**
 * ServiceSection
 *
 * A single service row on the /service page.
 * Alternates layout (left/right) based on `service.layout`.
 * Includes a title, a LetterReveal summary, and a video + point list media block.
 */
export const ServiceSection = memo(function ServiceSection({
  service,
  index,
  progress,
  setRef,
  activePoints,
  onActivatePoint,
}: ServiceSectionProps) {
  const title = (
    <h2 className="text-heading-lg font-semibold text-white">
      {service.name}
    </h2>
  );

  const summary = (
    <p className={classNames("max-w-[520px] text-title-fluid font-normal", service.layout === "right" && "md:ml-auto md:text-right")}>
      <LetterReveal progress={Math.max(0, progress - 0.18) / 0.82}>
        {service.summary}
      </LetterReveal>
    </p>
  );

  const mediaBlock = (
    <div>
      <AutoPlayVideo
        src={service.videoSrc}
        disablePictureInPicture
        className={classNames(
          "aspect-[4/5] w-full max-w-[260px] rounded-[2px] bg-white/80 object-cover",
          service.layout === "left" ? "md:ml-auto" : "md:mr-auto",
        )}
      />
      <ServicePointList
        service={service}
        activePoints={activePoints}
        onActivatePoint={onActivatePoint}
      />
    </div>
  );

  return (
    <section
      ref={setRef}
      data-service-index={index}
      className="grid gap-12 border-t border-white/10 py-16 md:grid-cols-2 md:items-center"
    >
      {service.layout === "left" ? (
        <>
          <div className="space-y-11">
            {title}
            {summary}
          </div>
          {mediaBlock}
        </>
      ) : (
        <>
          {mediaBlock}
          <div className="space-y-11 md:text-right">
            {title}
            {summary}
          </div>
        </>
      )}
    </section>
  );
});