import type { DetailPageData } from "../data/workDetails.schema";

type WorkDetailHeroProps = {
  work: DetailPageData;
};

export function WorkDetailHero({ work }: WorkDetailHeroProps) {
  return (
    <section className="work-detail-hero">
      <img src={work.hero} alt={work.title} className="work-detail-media" />

      <div>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">{work.title}</h1>
        <p className="mt-4 text-lg text-white/85 md:mt-6 md:text-xl">{work.summary}</p>

        <h2 className="mt-6 text-xl font-bold md:mt-8 md:text-2xl">Scope of Work</h2>
        <ul className="mt-3 space-y-2 text-base text-white/85 md:mt-4 md:space-y-2 md:text-lg">
          {work.scope.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>

        <h2 className="mt-6 text-xl font-bold md:mt-8 md:text-2xl">Project Deliverables</h2>
        <p className="mt-3 text-base text-white/80 md:mt-3 md:text-lg">{work.deliverables}</p>
      </div>
    </section>
  );
}
