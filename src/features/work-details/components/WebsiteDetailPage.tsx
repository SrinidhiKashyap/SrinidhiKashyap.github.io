import { DetailImage } from "./DetailImage";
import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";

const WEBSITE = {
  titleVideo: "/assets/work-websitedesign-homepage.mp4",
  heroVideo: "/assets/work-website-detail/meat-shop-hero.mp4",
  showcaseVideo: "/assets/work-website-detail/meat-shop-glimpse.mp4",
  sectionsMockup: "/assets/work-website-detail/all-sections-mockup.webp",
  pageTop: "/assets/work-website-detail/meat-shop-page-top.webp",
  pageBottom: "/assets/work-website-detail/meat-shop-page-bottom.webp",
} as const;

export function WebsiteDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-8 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:gap-10 lg:px-section-x-lg lg:py-10">
          <DetailVideo src={WEBSITE.titleVideo} className="min-h-[280px] md:min-h-[360px]" fit="cover" priority />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">Website Design</h1>
            <p className="mt-4 text-copy-lg text-white/85">
              Bee Concept created a modern online meat shop built around clear shopping journeys and strong product presentation.
            </p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              <li>&bull; Website Design</li>
              <li>&bull; UI/UX Design</li>
              <li>&bull; Development</li>
            </ul>
          </div>
        </section>

        <section className="px-section-x-sm pb-8 sm:px-section-x-md lg:px-section-x-lg lg:pb-14">
          <DetailVideo src={WEBSITE.heroVideo} className="h-[80vh] w-full" fit="cover" priority />
        </section>

        <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
          <div className="max-w-5xl">
            <h2 className="text-heading-sm font-semibold">Project Preview</h2>
            <p className="mt-5 text-copy-lg text-white/80">
              A premium online meat shop sought a complete website overhaul to better represent itself as a modern, customer-focused, quality-driven marketplace for fresh and hygienic meat products. The revamp emphasizes fresh chicken, tender mutton, succulent seafood, ready-to-cook delights, and gourmet cuts while reflecting MeatMart&apos;s commitment to quality, convenience, and customer satisfaction.
            </p>
            <h2 className="mt-12 text-heading-sm font-semibold">Challenges and Solution</h2>
            <p className="mt-5 text-copy-lg text-white/80">
              The challenge was to create a visually appealing website that communicated MeatMart&apos;s wide range of offerings. The solution is an informative, engaging, and user-friendly experience that helps different customers find fresh, high-quality products with ease.
            </p>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <DetailImage src={WEBSITE.sectionsMockup} alt="MeatMart website section designs" className="h-[80vh] w-full object-cover" />
        </section>

        <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16" aria-label="Full MeatMart website design">
          <DetailVideo src={WEBSITE.showcaseVideo} className="aspect-video w-full rounded-card" fit="cover" />
          <div className="mx-auto mt-10 grid max-w-5xl items-start gap-6 md:grid-cols-2 md:gap-0">
            <DetailImage src={WEBSITE.pageTop} alt="Top half of the MeatMart website" className="w-full rounded-card shadow-2xl" />
            <DetailImage src={WEBSITE.pageBottom} alt="Bottom half of the MeatMart website" className="w-full rounded-card shadow-2xl md:mt-28 md:-ml-8" />
          </div>
        </section>

        <NextWorkStrip workIds={["w4", "w1"]} />
      </main>
    </DetailVideoProvider>
  );
}
