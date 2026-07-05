import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";

const LOGOS = [
  { name: "Sterkros", src: "/assets/work-logo-detail/sterkros.mp4", background: "bg-black" },
  { name: "Finoda", src: "/assets/work-logo-detail/finoda.mp4", background: "bg-black" },
  { name: "Chronic Model", src: "/assets/work-logo-detail/chronic-model.mp4", background: "bg-black" },
  { name: "Adonis", src: "/assets/work-logo-detail/adonis.mp4", background: "bg-black" },
  { name: "Mysore University", src: "/assets/work-logo-detail/mysore-university.mp4", background: "bg-white" },
  { name: "Jewellery", src: "/assets/work-logo-detail/jewellery.mp4", background: "bg-white" },
  { name: "Om Enterprises", src: "/assets/work-logo-detail/om-enterprises.mp4", background: "bg-white" },
  { name: "Prakrita", src: "/assets/work-logo-detail/prakrita.mp4", background: "bg-white" },
  { name: "Hangal College", src: "/assets/work-logo-detail/hangal-college.mp4", background: "bg-white" },
  { name: "Kalpa", src: "/assets/work-logo-detail/kalpa.mp4", background: "bg-[#174c38]" },
] as const;

export function LogoDesignDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-8 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:gap-10 lg:px-section-x-lg lg:py-10">
          <DetailVideo
            src="/assets/work-logo-detail/logos-glimpse.mp4"
            className="min-h-[280px] md:min-h-[360px]"
            fit="cover"
            priority
          />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">LOGO Design</h1>
            <p className="mt-4 text-copy-lg text-white/85">
              Bee Concept crafted each logo design thoughtfully, selecting typography, colors, symbols, and visual elements to reflect brand identity and create a strong visual impact.
            </p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              <li>&bull; Logo Design</li>
              <li>&bull; Brand Identity</li>
              <li>&bull; Logo Animation</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-5 px-section-x-sm py-10 sm:grid-cols-2 sm:px-section-x-md lg:gap-7 lg:px-section-x-lg lg:py-16">
          {LOGOS.map((logo) => (
            <article key={logo.src} className={`relative overflow-hidden ${logo.background}`}>
              <DetailVideo src={logo.src} className="aspect-square w-full" fit="cover" />
              <h2 className="absolute inset-x-1 bottom-1 bg-black/50 px-4 py-2 text-base font-semibold italic backdrop-blur-sm md:text-lg">
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
