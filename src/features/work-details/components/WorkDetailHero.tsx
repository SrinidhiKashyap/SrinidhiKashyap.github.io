import type { DetailPageData } from "../types/work";

type WorkDetailHeroProps = {
  work: DetailPageData;
};

export function WorkDetailHero({ work }: WorkDetailHeroProps) {
  return (
    <section className="work-detail-hero">
      <img src={work.hero} alt={work.title} className="work-detail-media" />

      <div>
        <h1 className="text-5xl font-bold leading-tight">{work.title}</h1>
        <p className="mt-6 text-xl text-white/85">{work.summary}</p>

        <h2 className="mt-8 text-2xl font-bold">Scope of Work</h2>
        <ul className="mt-4 space-y-2 text-lg text-white/85">
          {work.scope.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Project Deliverables</h2>
        <p className="mt-3 text-lg text-white/80">{work.deliverables}</p>
      </div>
    </section>
  );
}
