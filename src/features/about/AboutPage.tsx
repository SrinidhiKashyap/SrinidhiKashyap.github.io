import { PageLayout } from "../../shared/components/layout/PageLayout";

const ABOUT_ASSETS = {
  team: "/assets/about/team.jpg",
  studio: "/assets/about/studio.jpg",
} as const;

export function AboutPage() {
  return (
    <PageLayout>
      <main className="bg-[#181818] text-white">
        <section className="px-section-x-sm py-10 sm:px-section-x-md sm:py-14 lg:px-section-x-lg lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-section-label font-medium">
                <span aria-hidden>&bull;</span> About Us
              </p>
              <h1 className="mt-7 max-w-3xl text-heading-lg font-semibold">
                We blend creativity with strategy to deliver standout designs that inspire and
                achieve remarkable results
              </h1>
              <div className="mt-8 max-w-2xl space-y-6 text-copy-lg text-white/90">
                <p>
                  We are Branding, web Design Agency based in Hublli specializing in Ui/Ux, and Web
                  Development.
                </p>
                <p>
                  With over 8 years of experience, Bee concept is an energetic, fresh and passionate
                  team offering creativity and industry knowledge.
                </p>
                <p>
                  As passionate storytellers, we blend design and strategy to accelerate brands
                  across diverse industries. With a fresh perspective and a deep love for our craft,
                  we turn ideas into impactful narratives that truly resonate.
                </p>
              </div>
            </div>

            <img
              src={ABOUT_ASSETS.team}
              alt="Bee Concept team in conversation"
              className="mx-auto aspect-[0.69] w-full max-w-[420px] rounded-[18px] object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section
          className="grid min-h-[440px] grid-cols-2 bg-[#303030]"
          aria-label="Bee Concept showreel"
        >
          <div className="bg-[#303030]" />
          <div className="bg-[#575757]" />
        </section>

        <section className="bg-[#242424] px-section-x-sm py-16 sm:px-section-x-md lg:px-section-x-lg lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-center">
            <div>
              <h2 className="text-heading-md font-semibold">Our Bee concept Studio</h2>
              <div className="mt-8 space-y-6 text-copy-lg text-white/85">
                <p>We inform u soon.</p>
                <p className="font-semibold text-white">Studio Address</p>
                <p>We inform u soon.</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hubballi"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-pill bg-bee-accent px-7 py-3 text-base font-medium text-black transition hover:bg-white"
              >
                Get Directions
              </a>
            </div>

            <img
              src={ABOUT_ASSETS.studio}
              alt="Bee Concept studio workspace"
              className="aspect-[1.45] w-full rounded-[18px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
