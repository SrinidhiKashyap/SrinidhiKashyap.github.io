import { memo } from "react";
import { Link } from "react-router-dom";
import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
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