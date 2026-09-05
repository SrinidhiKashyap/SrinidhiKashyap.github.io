import { memo } from "react";
import { Link } from "react-router-dom";
import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import { WORK_CATEGORY_LABELS } from "../../home/data/filters";
import { WORKS } from "../../home/data/works";

/**
 * StudioWorkStrip
 *
 * A "Latest From Our Studio" section shown at the bottom of the /service page.
 * Displays the 4th and 5th works from the WORKS data set in a two-column grid.
 */
export const StudioWorkStrip = memo(function StudioWorkStrip() {
  const studioWorks = WORKS.slice(3, 5);

  return (
    <section className="border-t border-white/10 pb-20 pt-14">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
        <div>
          <p className="py-1 font-normal text-2xl text-white md:py-2 md:text-3xl xl:text-4xl">
            <span aria-hidden>•</span> More Good Stuff
          </p>
          <h2 className="mt-2 max-w-[720px] text-heading-sm font-medium">
            Latest From <br /> Our Studio
          </h2>
        </div>

        <Link
          to="/#works"
          className="mt-10 rounded-pill bg-bee-accent px-8 py-3 text-base font-medium text-black transition hover:bg-white"
        >
          Browse more work
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {studioWorks.map((work) => (
          <Link key={work.id} to={work.pagePath} className="group">
            <div className="relative overflow-hidden rounded-card bg-bee-bg-card">
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
            <p className="mt-4 text-title-fluid text-white/90">
              {work.year} <span className="text-white/45">&bull;</span> {work.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
});
