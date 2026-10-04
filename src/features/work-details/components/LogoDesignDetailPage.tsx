import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";
import { WorkDetailHero } from "./WorkDetailHero";

const LOGOS = [
  { name: "Sterkros", src: "/assets/work-logo-detail/sterkros.mp4", background: "bg-black" },
  { name: "Finoda", src: "/assets/work-logo-detail/finoda.mp4", background: "bg-black" },
  {
    name: "Chronic Model",
    src: "/assets/work-logo-detail/chronic-model.mp4",
    background: "bg-black",
  },
  { name: "Adonis", src: "/assets/work-logo-detail/adonis.mp4", background: "bg-black" },
  {
    name: "Mysore University",
    src: "/assets/work-logo-detail/mysore-university.mp4",
    background: "bg-white",
  },
  { name: "Jewellery", src: "/assets/work-logo-detail/jewellery.mp4", background: "bg-white" },
  {
    name: "Om Enterprises",
    src: "/assets/work-logo-detail/om-enterprises.mp4",
    background: "bg-white",
  },
  { name: "Prakrita", src: "/assets/work-logo-detail/prakrita.mp4", background: "bg-white" },
  {
    name: "Hangal College",
    src: "/assets/work-logo-detail/hangal-college.mp4",
    background: "bg-white",
  },
  { name: "Kalpa", src: "/assets/work-logo-detail/kalpa.mp4", background: "bg-[#174c38]" },
] as const;

export function LogoDesignDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <WorkDetailHero
          videoSrc="/assets/work-logo-detail/logos-glimpse.mp4"
          videoClassName="[&>video]:scale-110"
          title="Logo Design"
          description={
            <p>
              Bee concept<sup>®</sup> crafted the logo design, thoughtfully selecting typography,
              colors, symbols, and visual elements to reflect the brand identity, incorporating
              thematic graphics and creative accents for a strong visual impact.
            </p>
          }
          scope={["Book Layouts", "Magazine Layouts", "Cover Design"]}
        />

        <section className="grid gap-5 px-section-x-sm py-10 sm:grid-cols-2 sm:px-section-x-md lg:gap-7 lg:px-section-x-lg lg:py-16">
          {LOGOS.map((logo) => (
            <article key={logo.src} className={`relative aspect-square overflow-hidden ${logo.background}`}>
              <DetailVideo
                src={logo.src}
                className={`absolute inset-0 h-full w-full ${logo.name === "Kalpa" ? "[&>video]:scale-125" : ""}`}
                fit="contain"
              />
              <h2
                className={`absolute inset-x-3 bottom-3 z-10 rounded-[6px] px-4 py-2 text-sm font-semibold not-italic ${
                  logo.background === "bg-white"
                    ? "bg-[#c4c4c4] text-[#181818]"
                    : logo.background === "bg-black"
                      ? "bg-[#181818] text-white"
                      : "bg-[#4c8f3d] text-white"
                }`}
              >
                {logo.name}
              </h2>
            </article>
          ))}
        </section>

        <NextWorkStrip workIds={["w4", "w1"]} />
      </main>
    </DetailVideoProvider>
  );
}
