import { useRef } from "react";

import { ASSETS } from "../../../shared/lib/assets";
import { magazineAssets as MAGAZINE } from "../data/magazineDetail";
import { useScrollSequence } from "../hooks/useScrollSequence";
import { DetailImage } from "./DetailImage";
import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";

/** Magazine case study with a scroll-driven, sticky mockup sequence. */
export function MagazineDetailPage() {
  const sequenceRef = useRef<HTMLElement>(null);
  const activeFrame = useScrollSequence(sequenceRef, MAGAZINE.scrollFrames.length);

  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="mx-auto max-w-full overflow-hidden">
          <div className="my-4 flex flex-col items-stretch px-6 pb-1 md:my-16 md:flex-row md:px-0">
            <div className="flex w-full md:w-[54%]">
              <DetailVideo
                src={ASSETS.workMagazines}
                className="mb-6 aspect-video h-full w-full md:mb-0"
                fit="cover"
                priority
              />
            </div>
            {/* Explicit Poppins lock to match the original magazine case study. */}
            <div className="flex w-full flex-col justify-center font-['Poppins',sans-serif] text-white md:w-[46%] md:px-16 lg:px-20 xl:pl-28">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl xl:text-[55px] xl:leading-[1.2]">
                Magazine and <br />
                books layout<br />
                design
              </h1>
              <p className="pt-6 text-sm font-normal md:text-base lg:text-lg xl:text-xl">
                Bee concept<sup>®</sup> crafted a sophisticated Cover <br />Page Design.
              </p>
              <h2 className="mb-2 mt-6 text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
                Bee concept<sup>®</sup> Scope of Work:
              </h2>
              <ul className="mt-2 space-y-1 text-sm font-normal md:text-base lg:text-lg">
                <li>&bull; Book Layouts</li>
                <li>&bull; Magazine Layouts</li>
                <li>&bull; Cover Design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Full-bleed hero image shown above the gallery grid. */}
        <section className="w-full" aria-label="Magazine layout hero">
          <DetailImage
            src={MAGAZINE.hero}
            alt="Magazine cover and layout hero"
            className="aspect-[16/9] w-full object-cover"
            priority
          />
        </section>

        <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
          <div className="mx-auto grid aspect-[4/3] w-full grid-cols-2 gap-4 lg:gap-6">
            <div className="grid min-h-0 grid-rows-[638fr_650fr] gap-4 lg:gap-6">
              {[MAGAZINE.gallery[0]!, MAGAZINE.gallery[2]!].map((image) => (
                <div key={image.src} className="min-h-0 overflow-hidden rounded-card">
                  <DetailImage src={image.src} alt={image.alt} className="h-full w-full scale-[1.5] object-cover" />
                </div>
              ))}
            </div>
            <div className="grid min-h-0 grid-rows-[749fr_545fr] gap-4 lg:gap-6">
              {[MAGAZINE.gallery[1]!, MAGAZINE.gallery[3]!].map((image) => (
                <div key={image.src} className="min-h-0 overflow-hidden rounded-card">
                  <DetailImage src={image.src} alt={image.alt} className="h-full w-full scale-[1.5] object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={sequenceRef}
          className="relative"
          style={{ minHeight: `calc(100svh + ${(MAGAZINE.scrollFrames.length - 1) * 84}svh)` }}
          aria-label="Scroll through magazine mockups"
        >
          <div className="sticky top-[76px] h-[calc(100svh-76px)] w-full overflow-hidden bg-black">
            <div className="relative h-full w-full">
              <DetailImage
                key={activeFrame}
                src={MAGAZINE.scrollFrames[activeFrame]!}
                alt={`Magazine presentation ${activeFrame + 1} of ${MAGAZINE.scrollFrames.length}`}
                className="magazine-scroll-image h-full w-full scale-[1.06] object-cover"
                priority
              />

              <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-pill bg-black/55 px-3 py-2 text-xs text-white backdrop-blur-sm">
                <span>
                  {activeFrame + 1} / {MAGAZINE.scrollFrames.length}
                </span>
                <span
                  className="relative block h-7 w-4 rounded-pill border border-white/80"
                  aria-hidden
                >
                  <span className="absolute left-1/2 top-1 h-1.5 w-1 -translate-x-1/2 rounded-pill bg-white" />
                </span>
                <span>Scroll</span>
              </div>
            </div>
          </div>
        </section>

        <NextWorkStrip workIds={["w4", "w9"]} />
      </main>
    </DetailVideoProvider>
  );
}
