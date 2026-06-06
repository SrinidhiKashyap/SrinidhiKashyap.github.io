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
export const NextWorkStrip = memo(function NextWorkStrip({
  workIds,
}: NextWorkStripProps) {
  const nextWorks = WORKS.filter((work) => workIds.includes(work.id));

  return (
    <section className="w-full px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-section-label"><span aria-hidden>&bull;</span> More Good Stuff</p>
          <h2 className="mt-4 text-testimonial-heading font-semibold">What Next?</h2>
        </div>
        <Link to="/#works" className="mt-9 rounded-pill bg-bee-accent px-5 py-2 text-sm font-medium text-black transition hover:bg-white">
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
              <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
                {work.categories.map((cat) => (
                  <span key={cat} className="rounded-pill bg-white/20 px-3 py-1 text-xs text-white">
                    {WORK_CATEGORY_LABELS[cat]}
                  </span>
                ))}
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