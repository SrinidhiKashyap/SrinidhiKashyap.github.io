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
        <section className="grid w-full gap-8 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:px-section-x-lg lg:gap-10 lg:py-10">
          <DetailVideo
            src={ASSETS.workMagazines}
            className="min-h-[280px] md:min-h-[360px]"
            fit="cover"
            priority
          />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">Magazine and books <br />layout design</h1>
            <p className="mt-4 text-copy-lg text-white/85">
              Bee Concept shaped editorial systems where expressive covers, clear hierarchy, and tactile mockups work as one collection.
            </p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              <li>&bull; Editorial Design</li>
              <li>&bull; Cover Design</li>
              <li>&bull; Layout</li>
            </ul>
          </div>
        </section>

        <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
          <DetailImage
            src={MAGAZINE.hero}
            alt="Magazine collection presentation"
            className="aspect-video w-full rounded-card object-cover"
            priority
          />

          <div className="mt-4 grid grid-cols-2 gap-4 lg:mt-6 lg:gap-6">
            {MAGAZINE.gallery.map((image) => (
              <DetailImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full rounded-card object-cover"
              />
            ))}
          </div>
        </section>

        <section
          ref={sequenceRef}
          className="relative px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg"
          style={{ minHeight: `calc(100svh + ${(MAGAZINE.scrollFrames.length - 1) * 42}svh)` }}
          aria-label="Scroll through magazine mockups"
        >
          <div className="sticky top-[76px] flex min-h-[calc(100svh-76px)] w-full items-center">
            <div className="relative w-full overflow-hidden rounded-card bg-white/5">
              <DetailImage
                src={MAGAZINE.scrollFrames[activeFrame]!}
                alt={`Magazine presentation ${activeFrame + 1} of ${MAGAZINE.scrollFrames.length}`}
                className="aspect-video w-full object-cover"
                priority
              />

              <div className="absolute bottom-5 right-5 flex items-center gap-3 rounded-pill bg-black/55 px-3 py-2 text-xs text-white backdrop-blur-sm">
                <span>{activeFrame + 1} / {MAGAZINE.scrollFrames.length}</span>
                <span className="relative block h-7 w-4 rounded-pill border border-white/80" aria-hidden>
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
