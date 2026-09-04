import { riceAssets as RICE, riceContent } from "../data/riceDetail";
import { DetailImage, DetailVideo, DetailVideoProvider, NextWorkStrip } from "./";

export function RiceDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-8 py-8 lg:grid-cols-[1.18fr_1fr] lg:gap-0 lg:py-0">
          <DetailImage
            src={RICE.hero}
            alt="Ratna premium jeera rice package"
            className="min-h-[300px] w-full object-cover lg:min-h-[580px]"
            priority
          />
          <div className="flex items-center px-section-x-sm py-6 sm:px-section-x-md lg:px-16 lg:py-12">
            <div className="max-w-[680px]">
              <h1 className="text-heading-sm font-semibold">{riceContent.title}</h1>
              <p className="mt-6 text-copy-lg text-white/90">{riceContent.intro}</p>
              <h2 className="mt-7 text-title-fluid font-semibold">Bee concept® Scope of Work:</h2>
              <ul className="mt-3 space-y-1 text-copy-lg text-white/90">
                {riceContent.scope.map((item) => (
                  <li key={item}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 px-section-x-sm py-10 sm:px-section-x-md md:grid-cols-2 lg:px-section-x-lg lg:gap-8 lg:py-16">
          <DetailImage
            src={RICE.frontFloat}
            alt="Floating front rice package"
            className="aspect-square w-full object-cover"
          />
          <DetailImage
            src={RICE.backFloat}
            alt="Floating back rice package"
            className="aspect-square w-full object-cover"
          />
        </section>

        <section className="grid gap-6 px-section-x-sm pb-10 sm:px-section-x-md md:grid-cols-[0.78fr_1.22fr] lg:px-section-x-lg lg:gap-8 lg:pb-16">
          <DetailImage
            src={RICE.pattern}
            alt="Ratna rice package pattern"
            className="aspect-square w-full object-cover"
          />
          <DetailImage
            src={RICE.frontAndBack}
            alt="Ratna rice package front and back"
            className="aspect-square w-full object-cover"
          />
        </section>

        <section className="px-section-x-sm pb-10 sm:px-section-x-md lg:px-section-x-lg lg:pb-16">
          <DetailVideo
            src={RICE.glimpseVideo}
            poster={RICE.angledFront}
            className="aspect-video w-full bg-[#dcc5ac]"
            fit="cover"
            muteToggle
          />
        </section>

        <NextWorkStrip workIds={["w1", "w2"]} />
      </main>
    </DetailVideoProvider>
  );
}
