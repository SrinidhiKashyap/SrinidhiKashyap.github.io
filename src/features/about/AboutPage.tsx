import { PageLayout } from "../../shared/components/layout/PageLayout";

const ABOUT_ASSETS = {
  team: "/assets/about/team.jpg",
  studio: "/assets/about/studio.jpg",
} as const;

export function AboutPage() {
  return (
    <PageLayout>
      <main className="bg-[#181818] text-white">
        <section className="px-6 py-5 sm:px-8 md:px-16 md:py-8 lg:px-24 lg:py-10 xl:py-14">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="relative flex flex-col pr-0 lg:w-3/5 lg:pr-20">
              <p className="relative z-10 mb-8 py-1 text-xl font-normal md:py-2 md:text-3xl lg:text-4xl">
                <span aria-hidden>&bull;</span> About Us
              </p>
              <h1 className="mb-8 text-2xl font-medium leading-[1.2] md:text-5xl lg:mb-12 lg:text-5xl">
                We blend creativity <br /> with strategy to deliver standout designs that
                <br /> inspire and achieve remarkable results
              </h1>
              <div className="max-w-none text-white lg:max-w-[900px]">
                <p className="mb-4 pr-0 text-xs font-normal sm:text-base md:text-xl lg:mb-6 lg:pr-12 lg:text-xl">
                  We are a Branding, Web Design Agency based in Hubli specializing in UI/UX and Web
                  Development.
                </p>
                <p className="mb-4 pr-0 text-xs font-normal sm:text-base md:text-xl lg:mb-6 lg:pr-12 lg:text-lg">
                  With over 8 years of experience, Bee Concept® is an energetic, fresh and vibrant
                  team offering creative talent and industry knowledge.
                </p>
                <p className="pr-0 text-xs font-normal sm:text-base md:text-xl lg:mb-6 lg:pr-16 lg:text-lg">
                  As passionate storytellers, we blend design and strategy to accelerate brands
                  across diverse industries. With a fresh perspective and a deep love for our craft,
                  we turn ideas into impactful narratives that truly resonate.
                </p>
              </div>
            </div>

            <div className="mb-6 overflow-hidden lg:w-[36%]">
              <img
                src={ABOUT_ASSETS.team}
                alt="Bee Concept® team in conversation"
                className="h-auto w-full rounded-none scale-[1.08] shadow-lg"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section
          className="grid min-h-[440px] grid-cols-2 bg-[#303030]"
          aria-label="Bee Concept® showreel"
        >
          <div className="bg-[#303030]" />
          <div className="bg-[#575757]" />
        </section>

        <section className="border-t-[14px] border-bee-accent bg-[#242424] px-6 py-5 text-white md:px-16 md:py-8 lg:px-24 lg:py-10 xl:py-14">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-normal md:text-5xl lg:text-6xl">Our Bee Concept®</h2>
              <h2 className="mb-4 text-3xl font-normal md:text-5xl lg:text-6xl">Studio</h2>
              <p className="mb-4 text-base text-white lg:text-xl">We inform you soon</p>
              <p className="mb-4 text-base font-semibold text-white lg:text-xl">Studio Address</p>
              <p className="mb-4 text-base text-white lg:text-xl">We inform you soon</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hubballi"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-pill bg-yellow-500 px-2 py-1 text-[10px] font-normal text-black transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow-400 md:mt-4 md:px-5 md:py-2 md:text-sm lg:mt-6 xl:px-8 xl:py-3 xl:text-base"
              >
                Get Directions
              </a>
            </div>

            <div className="overflow-hidden py-4 md:w-1/2 md:py-0">
              <img
                src={ABOUT_ASSETS.studio}
                alt="Bee Concept® studio workspace"
                className="h-auto w-full rounded-none scale-[1.08] shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
