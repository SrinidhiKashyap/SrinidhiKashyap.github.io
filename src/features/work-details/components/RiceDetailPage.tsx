import { riceAssets as RICE, riceContent } from "../data/riceDetail";
import { DetailImage, DetailVideo, DetailVideoProvider, NextWorkStrip } from "./";

/**
 * Two rows of two, read left-to-right (the magazine grid reads top-to-bottom).
 *
 * Each row keeps ONE shared height, so the tiles touch with no empty gaps, and
 * the widths split by the magazine ratios (height/width swapped to landscape):
 *   638 : 749  →  row 1, and  650 : 545  →  row 2.
 * `rowAspect` is that pair's sum, which is what forces both tiles to match.
 */
const GALLERY_ROWS = [
  {
    rowAspect: "aspect-[1387/563]",
    columns: "grid-cols-[638fr_749fr]",
    tiles: [
      { src: RICE.frontFloat, alt: "Floating front rice package" },
      { src: RICE.backFloat, alt: "Floating back rice package" },
    ],
  },
  {
    rowAspect: "aspect-[1195/563]",
    columns: "grid-cols-[650fr_545fr]",
    tiles: [
      { src: RICE.pattern, alt: "Ratna rice package pattern" },
      { src: RICE.frontAndBack, alt: "Ratna rice package front and back" },
    ],
  },
] as const;

export function RiceDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-12 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:gap-20 lg:px-section-x-lg lg:py-10">
          <DetailVideo
            src={RICE.glimpseVideo}
            poster={RICE.angledFront}
            className="min-h-[280px] md:min-h-[360px]"
            fit="cover"
            priority
            muteToggle
          />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">{riceContent.title}</h1>
            <p className="mt-4 text-copy-lg text-white/85">{riceContent.intro}</p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              {riceContent.scope.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
          <div className="mx-auto w-[80%] space-y-4 lg:space-y-6">
            {GALLERY_ROWS.map((row) => (
              <div
                key={row.rowAspect}
                className={`grid ${row.rowAspect} ${row.columns} gap-4 lg:gap-6`}
              >
                {row.tiles.map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-card">
                    <DetailImage
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full scale-[1.35] object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <NextWorkStrip workIds={["w1", "w2"]} />
      </main>
    </DetailVideoProvider>
  );
}
