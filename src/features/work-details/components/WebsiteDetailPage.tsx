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
        <section className="grid w-full gap-12 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:gap-20 lg:px-section-x-lg lg:py-10">
          <DetailVideo
            src={WEBSITE.titleVideo}
            className="min-h-[280px] md:min-h-[360px]"
            fit="cover"
            priority
          />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">Website Design</h1>
            <p className="mt-4 text-copy-lg text-white/85">
              Bee Concept created a modern online meat shop built around clear shopping journeys and
              strong product presentation.
            </p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              <li>&bull; Website Design</li>
              <li>&bull; UI/UX Design</li>
              <li>&bull; Development</li>
            </ul>
          </div>
        </section>

        {/* Wide hero clip — lock the wrapper to the clip's own 1920x900 ratio so
            the bottom of the artwork is never cropped away. */}
        <section className="px-section-x-sm pb-8 sm:px-section-x-md lg:px-section-x-lg lg:pb-14">
          <DetailVideo
            src={WEBSITE.heroVideo}
            className="aspect-[1920/900] w-full"
            fit="cover"
            priority
          />
        </section>

        <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
          <p className="text-section-label">
            <span aria-hidden>&bull;</span> Website Design
          </p>
          <h2 className="mt-4 text-heading-sm font-semibold">Project Preview</h2>
          <p className="mt-6 text-copy-lg text-white/80 md:mt-8">
            A premium online meat shop sought a complete website overhaul to better represent itself
            as a modern, customer-focused, quality-driven marketplace for fresh and hygienic meat
            products. The revamp emphasizes fresh chicken, tender mutton, succulent seafood,
            ready-to-cook delights, and gourmet cuts while reflecting MeatMart&apos;s commitment to
            quality, convenience, and customer satisfaction.
          </p>
          <h2 className="mt-10 text-heading-sm font-semibold md:mt-14">Challenges and Solution</h2>
          <p className="mt-6 text-copy-lg text-white/80 md:mt-8">
            The challenge was to create a visually appealing website that communicated
            MeatMart&apos;s wide range of offerings. The solution is an informative, engaging, and
            user-friendly experience that helps different customers find fresh, high-quality
            products with ease.
          </p>
        </section>

        {/* Full-bleed mockup at its native 2400x1740 ratio (was cropped by h-[80vh]). */}
        <section className="pb-10 lg:pb-16">
          <DetailImage
            src={WEBSITE.sectionsMockup}
            alt="MeatMart website section designs"
            className="w-full"
          />
        </section>

        <section
          className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16"
          aria-label="Full MeatMart website design"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-6 md:grid-cols-2 md:gap-0">
            <DetailImage
              src={WEBSITE.pageTop}
              alt="Top half of the MeatMart website"
              className="w-full rounded-card shadow-2xl"
            />
            <DetailImage
              src={WEBSITE.pageBottom}
              alt="Bottom half of the MeatMart website"
              className="w-full rounded-card shadow-2xl md:mt-28 md:-ml-8"
            />
          </div>
        </section>

        <NextWorkStrip workIds={["w4", "w1"]} />
      </main>
    </DetailVideoProvider>
  );
}
