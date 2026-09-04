import type { DetailPageData } from "../data/workDetails.schema";

type WorkResultsProps = {
  work: DetailPageData;
};

export function WorkResults({ work }: WorkResultsProps) {
  return (
    <section className="work-detail-section pb-12 md:pb-16">
      <div className="work-detail-insights">
        <div>
          <h3 className="text-lg font-semibold text-white md:text-xl">Challenge</h3>
          <p className="mt-2 text-white/75 md:mt-3">{work.challenge}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white md:text-xl">Outcome</h3>
          <p className="mt-2 text-white/75 md:mt-3">{work.outcome}</p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-bold text-white md:mt-10 md:text-2xl">Project Gallery</h2>
      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 grid-cols-1 sm:grid-cols-2">
        {work.gallery.map((imagePath) => (
          <img
            key={imagePath}
            src={imagePath}
            alt={`${work.title} visual`}
            className="work-detail-gallery-image"
          />
        ))}
      </div>
    </section>
  );
}
