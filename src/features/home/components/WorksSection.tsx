import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import { classNames } from "../../../shared/lib/classNames";
import { WORK_CATEGORY_LABELS, WORK_FILTERS } from "../data/filters";
import { WORKS } from "../data/works";
import type { HomeWorkFilter, WorkItem } from "../types/home";

type WorksSectionProps = {
  activeCategory: HomeWorkFilter;
  onCategoryChange: (category: HomeWorkFilter) => void;
};

// ─── Work Card ───────────────────────────────────────────────────────────────

type WorkCardProps = {
  work: WorkItem;
  /** Every second card is pushed down to create a staggered two-column look. */
  offset: boolean;
};

const WorkCard = memo(function WorkCard({ work, offset }: WorkCardProps) {
  return (
    <article className={classNames("work-card", offset && "md:translate-y-[90px]")}>

      {/* Thumbnail — image or auto-playing video */}
      <div className="work-card__media relative w-full overflow-hidden rounded-media bg-bee-bg-deep">
        {work.mediaType === "video" ? (
          <AutoPlayVideo
            src={work.mediaUrl}
            disablePictureInPicture
            className="aspect-video w-full object-cover"
          />
        ) : (
          <img
            src={work.mediaUrl}
            alt={work.title}
            className="aspect-video w-full object-cover"
          />
        )}

        {/*
         * Overlay bar at the bottom of the thumbnail.
         * Fades to a lighter tint and arrow turns bee-accent on hover.
         * Both transitions are in home.css under "5. WORK CARDS".
         */}
        <div className="work-card__overlay absolute bottom-3.5 left-3.5 right-3.5 flex min-h-[54px] items-center justify-between gap-4 rounded-[14px] bg-black/70 px-5 py-2.5 backdrop-blur-overlay">
          <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
            {work.categories.map((category) => (
              <span key={category}>{WORK_CATEGORY_LABELS[category]}</span>
            ))}
          </div>

          <Link
            to={work.pagePath}
            aria-label={`Open ${work.title}`}
            className="work-card__arrow grid h-[38px] w-[38px] flex-none place-items-center rounded-pill bg-white/10 text-sm text-white"
          >
            &#8599;
          </Link>
        </div>
      </div>

      {/* Title row: year · title */}
      <div className="mt-[18px] flex items-center gap-2 text-title-fluid font-normal text-white/80">
        {work.year}
        <span className="text-white/50">&bull;</span>
        {work.title}
      </div>

    </article>
  );
});

// ─── Works Section ────────────────────────────────────────────────────────────

export function WorksSection({ activeCategory, onCategoryChange }: WorksSectionProps) {
  const filteredWorks =
    useMemo(
      () =>
        activeCategory === "All Work"
          ? WORKS
          : WORKS.filter((w) => w.categories.includes(activeCategory)),
      [activeCategory],
    );

  return (
    <section id="works" className="bg-bee-bg-primary text-white">
      <div className="w-full px-section-x-sm py-section-y sm:px-section-x-md lg:px-section-x-lg">

        {/* Section header */}
        <p className="text-label font-normal">
          <span aria-hidden>•</span> Our Works
        </p>
        <h2 className="mt-6 text-heading-sm font-semibold">
          Take a look at <br /> our projects
        </h2>

        {/* Category filter buttons */}
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          {WORK_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onCategoryChange(filter.value)}
              className={classNames(
                "text-base font-normal transition",
                filter.value === activeCategory
                  ? "text-white"
                  : "text-white/30 hover:text-white/70",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/*
         * Two-column staggered grid.
         * Row gap is larger to accommodate the 90px card offset.
         * On mobile: single column, offset removed (see WorkCard above).
         */}
        <div className="mx-auto mt-14 grid max-w-[1220px] grid-cols-1 gap-8 gap-y-[80px] md:grid-cols-2 md:gap-x-16">
          {filteredWorks.map((work, index) => (
            <WorkCard key={work.id} work={work} offset={index % 2 !== 0} />
          ))}
        </div>

      </div>
    </section>
  );
}