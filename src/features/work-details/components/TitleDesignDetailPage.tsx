import { ASSETS } from "../../../shared/lib/assets";
import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import { titleDesignAssets as TITLE } from "../data/titleDesignDetail";
import { DetailImage } from "./DetailImage";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";

/** Bespoke title-design portfolio page based on the supplied art direction. */
export function TitleDesignDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
      <section className="grid min-h-[430px] items-center gap-10 px-section-x-sm py-12 sm:px-section-x-md lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)] lg:px-section-x-lg lg:py-16">
        <div className="min-w-0 overflow-hidden rounded-card bg-white/5">
          <AutoPlayVideo
            src={ASSETS.workTitleDesign}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="min-w-0 max-w-lg lg:pl-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-bee-accent">
            Selected work
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[0.95]">
            Title Design
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">
            Bee Concept crafted expressive title identities that turn words into memorable visual signatures.
          </p>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold">Bee Concept&apos;s Scope of Work</p>
            <p className="mt-2 text-sm text-white/55">Title Design &bull; Typography &bull; Art Direction</p>
          </div>
        </div>
      </section>

      <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
        <DetailImage
          src={TITLE.karna}
          alt="Karna cinematic title artwork"
          className="aspect-[16/9] w-full rounded-card object-cover"
          priority
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2 md:grid-rows-2 lg:mt-6 lg:gap-6">
          <DetailImage
            src={TITLE.gani}
            alt="Gani colorful title artwork"
            className="h-full min-h-0 w-full rounded-card object-cover md:row-span-2"
          />
          <DetailImage
            src={TITLE.bevarsiLife}
            alt="Bevarsi Life hand-lettered title artwork"
            className="aspect-[4/3] h-full w-full rounded-card object-cover"
          />
          <DetailImage
            src={TITLE.jatayu}
            alt="Jatayu cinematic title artwork"
            className="aspect-[4/3] h-full w-full rounded-card object-cover"
          />
        </div>
      </section>

      <NextWorkStrip workIds={["w4", "w1"]} />
      </main>
    </DetailVideoProvider>
  );
}
