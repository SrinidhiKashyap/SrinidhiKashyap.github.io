import type { DetailPageData } from "../types/work";

type WorkResultsProps = {
  work: DetailPageData;
};

export function WorkResults({ work }: WorkResultsProps) {
  return (
    <section className="work-detail-section pb-16">
      <div className="work-detail-insights">
        <div>
          <h3 className="text-xl font-semibold text-white">Challenge</h3>
          <p className="mt-3 text-white/75">{work.challenge}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Outcome</h3>
          <p className="mt-3 text-white/75">{work.outcome}</p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">Project Gallery</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {work.gallery.map((imagePath) => (
          <img key={imagePath} src={imagePath} alt={`${work.title} visual`} className="work-detail-gallery-image" />
        ))}
      </div>
    </section>
  );
}
