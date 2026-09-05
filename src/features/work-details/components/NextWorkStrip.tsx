import { memo } from "react";
import { Link } from "react-router-dom";
import { WORK_CATEGORY_LABELS } from "../../home/data/filters";
import { WORKS } from "../../home/data/works";
import { DetailVideo } from "./DetailVideo";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NextWorkStripProps {
  /** IDs of the work items to display as "next" suggestions */
  workIds: string[];
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * "What Next?" strip shown at the bottom of detail pages.
 * Displays up to two related or next project cards with video thumbnails
 * and category tags.
 *
 * @example
 * ```tsx
 * <NextWorkStrip workIds={["w1", "w7"]} />
 * ```
 */
export const NextWorkStrip = memo(function NextWorkStrip({ workIds }: NextWorkStripProps) {
  const nextWorks = WORKS.filter((work) => workIds.includes(work.id));

  return (
    <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-section-label">
            <span aria-hidden>&bull;</span> More Good Stuff
          </p>
          <h2 className="mt-4 max-w-[720px] text-heading-sm font-semibold">What Next?</h2>
        </div>
        <Link
          to="/#works"
          className="mt-9 rounded-pill bg-bee-accent px-8 py-3 text-base font-medium text-black transition hover:bg-white"
        >
          Browse more work
        </Link>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {nextWorks.map((work) => (
          <Link key={work.id} to={work.pagePath} className="group">
            <div className="relative overflow-hidden rounded-card bg-bee-bg-card">
              <DetailVideo
                src={work.mediaUrl}
                className="aspect-video w-full transition duration-slower group-hover:scale-[1.03]"
                fit="cover"
              />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex min-h-[46px] items-center justify-between gap-4 rounded-[14px] bg-black/70 px-5 py-0 backdrop-blur-overlay transition-colors duration-500 group-hover:bg-[#373737]/[0.52]">
                <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-1 text-sm font-normal text-white/85 md:text-base">
                  {work.categories.map((category) => (
                    <span key={category}>{WORK_CATEGORY_LABELS[category]}</span>
                  ))}
                </div>
                <span className="grid h-9 w-9 flex-none place-items-center rounded-pill bg-white/10 text-sm text-white transition-colors duration-300 group-hover:bg-bee-accent group-hover:text-black">
                  &#8599;
                </span>
              </div>
            </div>
            <p className="mt-3 text-title-fluid text-white/90">
              {work.year} <span className="text-white/45">&bull;</span> {work.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
});
