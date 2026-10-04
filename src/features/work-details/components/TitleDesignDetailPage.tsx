import { titleDesignAssets as TITLE } from "../data/titleDesignDetail";
import { DetailImage } from "./DetailImage";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";
import { WorkDetailHero } from "./WorkDetailHero";

/** Bespoke title-design portfolio page based on the supplied art direction. */
export function TitleDesignDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <WorkDetailHero
          videoSrc="/assets/work-titledesign-homepage.mp4"
          title="Title Design"
          description={
            <p>
              Bee concept<sup className="text-[0.6em]">®</sup> crafted a sophisticated Title Design.
            </p>
          }
          scope={["Title Design"]}
        />

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
