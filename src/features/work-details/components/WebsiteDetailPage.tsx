import { DetailImage } from "./DetailImage";
import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";
import { WorkDetailHero } from "./WorkDetailHero";

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
        <WorkDetailHero
          videoSrc={WEBSITE.titleVideo}
          title="Website Design"
          description={
            <p>
              Bee concept<sup>®</sup> crafted a sophisticated Cover Page Design.
            </p>
          }
          scope={["Book Layouts", "Magazine Layouts", "Cover Design"]}
        />

        {/* Wide hero clip, cropped slightly at the top and bottom to fill the frame. */}
        <section className="w-full pb-8 lg:pb-14">
          <DetailVideo
            src={WEBSITE.heroVideo}
            className="aspect-[2.2/1] w-full"
            fit="cover"
            priority
          />
        </section>

        <section className="px-6 py-10 text-white sm:py-16 lg:px-24 lg:py-20">
          <div>
            <h2 className="text-2xl font-medium md:text-4xl lg:text-[55px]">Project Preview</h2>
            <p className="pt-6 text-xs font-normal md:text-base lg:text-lg xl:text-xl">
              A premium online meat shop sought a comprehensive overhaul of its website to better
              represent itself as a modern, customer-focused, and quality-driven marketplace for
              fresh and hygienic meat products. The revamp focused on emphasizing their full
              spectrum of offerings: Fresh Chicken, Tender Mutton, Succulent Seafood,
              Ready-to-Cook Delights, and Gourmet Cuts. Our task was to create a vibrant,
              interactive website that reflects MeatMart’s commitment to quality, convenience,
              and customer satisfaction.
            </p>
          </div>
          <div className="pt-12 sm:pt-16 md:pt-20 lg:pt-24">
            <h2 className="text-2xl font-medium md:text-4xl lg:text-[55px]">
              Challenges and Solution
            </h2>
            <p className="pt-6 text-xs font-normal md:text-base lg:text-lg xl:text-xl">
              The challenge was to create a visually appealing website that effectively communicated
              MeatMart’s wide range of offerings. The company needed a platform that was not only
              informational but also engaging and user-friendly to cater to diverse customer
              preferences for fresh, high-quality meat products.
            </p>
          </div>
        </section>

        <section className="pb-10 lg:pb-16">
          <div className="aspect-[2.2/1] w-full overflow-hidden">
            <DetailImage
              src={WEBSITE.sectionsMockup}
              alt="MeatMart website section designs"
              className="h-full w-full object-cover object-center"
            />
          </div>
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
