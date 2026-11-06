import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";
import { WorkDetailHero } from "./WorkDetailHero";

const ROOT = "/assets/work-uiux-live";

export function UiUxDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <div>
          <WorkDetailHero
            videoSrc={`${ROOT}/app-intro-video.mp4`}
            title={<>Kaju Factory <br />Android App</>}
            description={<p>Bee concept<sup>®</sup> Revamping the ecommerce industry with our innovative design solutions!</p>}
            scope={["UI/UX Design"]}
          />

          <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
            <img src={`${ROOT}/app-hero.webp`} alt="Kaju Factory app hero image" className="aspect-[16/9] w-full object-cover" fetchPriority="high" />
          </section>
          <img src={`${ROOT}/app-screens-overview.webp`} alt="Kaju Factory mobile app screens" className="h-auto w-full" loading="lazy" />
          <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
            <p className="max-w-[1120px] text-copy-lg text-white/80">
              We crafted a cutting-edge e-commerce mobile application exclusively for dry fruits,
              delivering a seamless shopping experience with intuitive navigation, rich visuals and
              user-friendly features designed to delight health-conscious customers and elevate their
              journey.
            </p>
          </section>
          <DetailVideo src={`${ROOT}/app-demo-video.mp4`} className="aspect-video w-full" />

          <section className="space-y-12 px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:space-y-16 lg:py-16">
            <StoryBlock title="Our Task">
              <p>
                Our mission was to completely revamp the digital identity of Kaju Factory while
                celebrating its legacy of premium quality and trust. BeeConcept was entrusted with
                crafting a user-centric mobile application that would not only modernize the brand&apos;s
                online presence but also reflect its tradition of excellence.
              </p>
              <p>
                It was imperative to design an intuitive, visually engaging interface that would
                seamlessly integrate easy product browsing, customization options, and a hassle-free
                checkout experience. The goal was a smooth transition for loyal customers while
                attracting new ones, maintaining brand recognition, and driving business growth.
              </p>
            </StoryBlock>
            <StoryBlock title="The Challenge">
              <p>
                Designing for the Kaju Factory application brought a unique set of challenges. The
                rapidly evolving food and retail market, coupled with the need to bridge traditional
                values with modern digital experiences, required a deep understanding of both the
                brand’s heritage and user expectations. One major hurdle was simplifying online
                ordering and customer engagement without compromising the essence of the brand.
              </p>
              <p>
                A subpar user experience at any touchpoint could lead to reduced customer loyalty and
                missed growth opportunities in a highly competitive market.
              </p>
            </StoryBlock>
            <StoryBlock title="Define">
              <p>
                Our process began with an in-depth analysis of customer personas and detailed purchase
                journeys tailored to Kaju Factory’s target audience. We designed intuitive workflows
                for effortless browsing, quick ordering, and seamless tracking of premium dry fruits.
                We also proposed initiatives to enhance customer acquisition, engagement, and loyalty.
              </p>
            </StoryBlock>
          </section>

          <img src={`${ROOT}/design-exploration.webp`} alt="Kaju Factory app design exploration" className="h-auto w-full" loading="lazy" />
          <section className="flex min-h-[50vh] sm:min-h-[66vh] lg:min-h-screen">
            <DetailVideo src={`${ROOT}/app-feature-video.mp4`} className="w-1/2" />
            <img src={`${ROOT}/app-logo.webp`} alt="Kaju Factory app logo" className="w-1/2 object-cover" loading="lazy" />
          </section>

          <section className="bg-bee-bg-deep px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
            <h2 className="text-lg font-medium sm:text-3xl md:text-4xl lg:text-5xl xl:text-[55px]">
              • Typeface
            </h2>
            <div>
              <h1 className="py-8 text-5xl font-medium sm:py-10 sm:text-7xl md:py-12 lg:py-14 lg:text-8xl xl:py-16 xl:text-[115px]">
              Poppins
              </h1>
              <h2 className="text-lg font-medium leading-tight sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight xl:text-[55px]">
              Why Poppins Typeface for <br /> Kaiju Factory?
              </h2>
              <p className="py-3 text-xs text-white/80 sm:py-4 md:py-5 md:text-base lg:py-6 lg:text-lg xl:text-xl">
                <strong>Modern and Clean Aesthetic</strong><br />Poppins is a modern sans-serif typeface that aligns with contemporary design trends. Its clean and minimalistic look enhances<br className="hidden lg:block" /> readability, making it perfect for an online shopping app that aims to offer a smooth user experience.
              </p>
              <p className="py-3 text-xs text-white/80 sm:py-4 md:py-5 md:text-base lg:py-6 lg:text-lg xl:text-xl">
                <strong>Optimized for Digital Interfaces</strong><br />Poppins is specifically designed for digital use, ensuring it looks sharp and legible across all<br className="hidden lg:block" /> devices, whether on a high-resolution smartphone screen or a desktop browser.
              </p>
              <p className="py-3 text-xs text-white/80 sm:py-4 md:py-5 md:text-lg lg:py-6 xl:text-xl">
                Poppins is a modern, clean sans-serif typeface ideal for digital interfaces. Its geometric design conveys precision and quality,<br className="hidden lg:block" /> while its rounded edges add warmth and approachability. Optimized for readability and versatility, Poppins reinforces Kaiju<br className="hidden lg:block" /> Factory&apos;s premium and user-friendly brand identity.
              </p>
              <h3 className="text-4xl md:text-5xl lg:text-[121px]">
                <strong>Aa </strong><span className="font-medium">Aa </span><span className="font-normal">Aa</span>
              </h3>
            </div>
            <div className="space-y-12 py-3 text-xs sm:py-4 md:py-6 lg:py-8 lg:text-lg">
              <TypefaceSample firstWeight="font-bold" secondWeight="font-medium" firstLabel="Bold" secondLabel="Medium" />
              <TypefaceSample firstWeight="font-normal" secondWeight="font-light" firstLabel="Regular" secondLabel="Light" />
            </div>
          </section>

          <section className="bg-bee-bg-card px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
            <p className="pb-6 text-section-label lg:pb-10">• Color</p>
            <img
              src={`${ROOT}/app-color-palette.webp`}
              alt="Kaju Factory color palette"
              className="h-[360px] w-full object-contain sm:h-[520px]"
              loading="lazy"
            />
          </section>
          <img src={`${ROOT}/app-icons.webp`} alt="Kaju Factory icons" className="h-auto w-full" loading="lazy" />

          <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
            <p className="text-section-label">• Deliver</p>
            <p className="mt-6 max-w-[760px] text-copy-lg text-white/80 md:mt-8">
              We maintained the right balance of colors and elements, making them look impressive and
              clickable. After a pleasing and playful splash screen, a simplified dashboard loads
              with clear information laid out according to user priorities.
            </p>
          </section>

          <section className="relative w-full bg-[#211b19]">
            <img src={`${ROOT}/app-background.webp`} alt="" className="absolute inset-0 h-full w-full object-cover pt-12" />
            <div className="relative z-10 mx-auto max-w-7xl px-4">
              <div className="grid grid-cols-2 gap-6 sm:gap-12">
                {[
                  "app-screen-08.webp",
                  "app-screen-09.webp",
                  "app-screen-10.webp",
                  "app-screen-11.webp",
                  "app-screen-12.webp",
                  "app-screen-13.webp",
                  "app-screen-10.webp",
                  "app-screen-15.webp",
                  "app-screen-16.webp",
                  "app-screen-17.webp",
                ].map((src, index) => (
                  <div key={`${src}-${index}`} className="relative flex aspect-square items-center justify-center">
                    <img src={`${ROOT}/${src}`} alt={`Kaju Factory app screen ${index + 1}`} className="w-1/2 rounded-xl" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="sticky bottom-0 z-20 -mt-36 flex justify-center md:-mt-56 lg:-mt-80">
                <img src={`${ROOT}/app-hand-animation.gif`} alt="Phone displaying the Kaju Factory app" className="h-[37vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="bg-bee-bg-primary px-section-x-sm py-10 text-center sm:px-section-x-md lg:px-section-x-lg">
            <h2 className="text-heading-sm font-extrabold">THANKS</h2>
            <p className="mt-2 text-xl md:text-2xl xl:text-4xl">To The Whole Kaiju Factory Team!</p>
          </section>
        </div>
        <NextWorkStrip workIds={["w5", "w9"]} />
      </main>
    </DetailVideoProvider>
  );
}

function StoryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-heading-sm font-semibold">{title}</h2>
      <div className="mt-6 space-y-4 text-copy-lg text-white/80 md:mt-8 md:space-y-6">
      {children}
      </div>
    </div>
  );
}

function TypefaceSample({
  firstWeight,
  secondWeight,
  firstLabel,
  secondLabel,
}: {
  firstWeight: string;
  secondWeight: string;
  firstLabel: string;
  secondLabel: string;
}) {
  return (
    <div className="flex gap-0 sm:gap-4">
      <div className="relative flex w-24 flex-col justify-between">
        <p className={firstWeight}>Title</p>
        <p className={secondWeight}>Subtext</p>
        <span className="absolute bottom-0 right-4 top-0 w-0.5 bg-red-500 sm:right-0" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className={`${firstWeight} py-2`}>
          We bring you the world&apos;s best cashews <span className="hidden sm:inline">. . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span> {firstLabel}
        </p>
        <p className={secondWeight}>
          Experience the new kajufactory app <span className="hidden sm:inline">. . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span> {secondLabel}
        </p>
      </div>
    </div>
  );
}
