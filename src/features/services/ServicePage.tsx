import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../shared/components/layout/PageLayout";
import { AutoPlayVideo } from "../../shared/components/media/AutoPlayVideo";
import { classNames } from "../../shared/lib/classNames";
import { works } from "../home/data/homeContent";
import { services } from "./data/serviceContent";
import type { ServiceItem } from "./data/serviceContent";
import "./service.css";

const MARQUEE_TEXT =
  "Our design and development team ensures a multidisciplinary, holistic research process.";

function useServiceRevealProgress() {
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

type LetterRevealProps = {
  children: string;
  progress: number;
  className?: string;
};

const LetterReveal = memo(function LetterReveal({ children, progress, className }: LetterRevealProps) {
  const characters = Array.from(children);
  const litCount = Math.ceil(characters.length * progress);

  return (
    <span className={className}>
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          className={classNames(
            "transition-colors duration-slow",
            index < litCount ? "text-white" : "text-white/20",
          )}
        >
          {character}
        </span>
      ))}
    </span>
  );
});

type ServicePointListProps = {
  service: ServiceItem;
  activePoints: Set<string>;
  onActivatePoint: (pointKey: string) => void;
};

const ServicePointList = memo(function ServicePointList({ service, activePoints, onActivatePoint }: ServicePointListProps) {
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

type ServiceSectionProps = {
  service: ServiceItem;
  index: number;
  progress: number;
  setRef: (node: HTMLElement | null) => void;
  activePoints: Set<string>;
  onActivatePoint: (pointKey: string) => void;
};

const ServiceSection = memo(function ServiceSection({
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

const StudioWorkStrip = memo(function StudioWorkStrip() {
  const studioWorks = works.slice(3, 5);

  return (
    <section className="border-t border-white/10 pb-20 pt-14">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-section-label">
            <span aria-hidden>&bull;</span> More Good Stuff
          </p>
          <h2 className="mt-4 text-testimonial-heading font-semibold">
            Latest From <br /> Our Studio
          </h2>
        </div>

        <Link
          to="/#works"
          className="mt-10 rounded-pill bg-bee-accent px-5 py-2 text-xs font-medium text-black transition hover:bg-white"
        >
          Browse more work
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {studioWorks.map((work) => (
          <Link key={work.id} to={work.pagePath} className="group">
            <div className="overflow-hidden rounded-card bg-bee-bg-card">
              {work.mediaType === "video" ? (
                <AutoPlayVideo
                  src={work.mediaUrl}
                  disablePictureInPicture
                  className="aspect-video w-full object-cover transition duration-slower group-hover:scale-[1.03]"
                />
              ) : (
                <img
                  src={work.mediaUrl}
                  alt={work.title}
                  className="aspect-video w-full object-cover transition duration-slower group-hover:scale-[1.03]"
                />
              )}
            </div>
            <p className="mt-4 text-title-fluid text-white/90">
              {work.year} <span className="text-white/45">&bull;</span> {work.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
});

export default function ServicePage() {
  const { progresses, sectionRefs } = useServiceRevealProgress();
  const [activePoints, setActivePoints] = useState<Set<string>>(() => new Set());

  const activatePoint = useCallback((pointKey: string) => {
    setActivePoints((current) => {
      const next = new Set(current);
      next.add(pointKey);
      return next;
    });
  }, []);

  return (
    <PageLayout>
      <main className="bg-bee-bg-primary text-white">
        <div className="w-full px-section-x-sm pb-8 pt-10 sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label">
            <span aria-hidden>&bull;</span> Service
          </p>
          <h1 className="mt-5 max-w-[650px] text-testimonial-heading font-semibold">
            An Advertising <br /> Agency Driven By <br /> Creative Expertise
          </h1>
        </div>

        <div className="service-marquee overflow-hidden py-12">
          <div className="service-marquee__track">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>{MARQUEE_TEXT}</span>
            ))}
          </div>
          <div className="service-marquee__track service-marquee__track--outline">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>

        <div className="w-full px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
          {services.map((service, index) => (
            <ServiceSection
              key={service.name}
              service={service}
              index={index}
              progress={progresses[index] ?? 0}
              setRef={(node) => {
                sectionRefs.current[index] = node;
              }}
              activePoints={activePoints}
              onActivatePoint={activatePoint}
            />
          ))}

          <StudioWorkStrip />
        </div>
      </main>
    </PageLayout>
  );
}
