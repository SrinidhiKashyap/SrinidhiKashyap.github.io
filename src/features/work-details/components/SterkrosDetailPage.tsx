import { sterkrosAssets as STERKROS, sterkrosContent } from "../data/sterkrosDetail";
import { CompareSlider, DetailImage, DetailVideo, DetailVideoProvider, NextWorkStrip } from "./";
import { WorkDetailHero } from "./WorkDetailHero";

export function SterkrosDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <WorkDetailHero
          videoSrc={STERKROS.glimpseVideo}
          title={sterkrosContent.title}
          description={
            <>
              <p>{sterkrosContent.intro}</p>
              <p>{sterkrosContent.introAlt}</p>
            </>
          }
          scope={sterkrosContent.scope}
          muteToggle
        />

        <section className="w-full px-section-x-sm text-white sm:px-section-x-md lg:px-section-x-lg">
          <div className="py-10 lg:py-16">
            <h2 className="text-section-label font-normal">
              <span aria-hidden>&bull;</span> Brand Identity
            </h2>
            <h2 className="mt-3 text-heading-sm font-semibold md:mt-4">
              Explore the Process
            </h2>
            <div className="mt-6 space-y-6 text-copy-lg text-white/80 md:mt-8 md:space-y-8">
              <p>
                The process began with a comprehensive analysis of the Sterkros Group&apos;s values,
                mission, and target audience. This initial research laid the foundation for
                developing a brand strategy that aligned with the team&apos;s goals and resonated with
                their target market. Bee concept® worked closely with the Sterkros Group to
                understand their vision, values, and unique selling propositions.
              </p>
              <p>
                Based on the insights gained from the research phase, Bee concept® proceeded to
                create a visual identity that embodied the Sterkros brand personality. This involved
                designing a distinctive logo that served as the centerpiece of the brand&apos;s visual
                representation. The logo was carefully crafted around the tilde symbol coupled with
                a triangle way of the &ldquo;S&rdquo; creating a recognizable visual symbol for the fitness
                team.
              </p>
              <p>
                Bee concept® selected a modern and sophisticated design for STERKROS centered around
                a rich emerald red, black, and white palette, which symbolizes energy, freshness,
                and strength. The logo fuses the &ldquo;S&rdquo; and Fitness Triangle in a bold monogram. Clean
                lines and a structured layout, enhanced by a sleek typographic system, give the
                professional look.
              </p>
            </div>
          </div>
          <hr />
          <div className="flex flex-col justify-between gap-10 py-10 text-center sm:flex-row sm:gap-6 lg:py-16">
            <div className="flex flex-col justify-between sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <h3 className="text-lg font-normal sm:text-xl md:text-2xl lg:text-3xl">Guide Lines</h3>
              <div className="relative mx-auto mt-8 h-52 w-28 sm:mt-0 sm:h-56 sm:w-36 md:h-64 md:w-48 lg:h-72 lg:w-60 xl:h-80 xl:w-64">
                <DetailImage
                  src={STERKROS.guideline}
                  alt="Sterkros wordmark"
                  className="absolute bottom-0 left-1/2 h-auto w-[105%] -translate-x-1/2 object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <h3 className="text-lg font-normal sm:text-xl md:text-2xl lg:text-3xl">Logo Type</h3>
              <div className="relative mx-auto mt-8 h-52 w-28 sm:mt-0 sm:h-56 sm:w-36 md:h-64 md:w-48 lg:h-72 lg:w-60 xl:h-80 xl:w-64">
                <DetailImage
                  src={STERKROS.logo}
                  alt="Sterkros logo type"
                  className="absolute bottom-0 left-1/2 h-auto w-[180%] -translate-x-1/2 translate-y-[9.85%] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <h3 className="text-lg font-normal sm:text-xl md:text-2xl lg:text-3xl">Sign</h3>
              <div className="relative mx-auto mt-8 h-52 w-28 sm:mt-0 sm:h-56 sm:w-36 md:h-64 md:w-48 lg:h-72 lg:w-60 xl:h-80 xl:w-64">
                <DetailImage
                  src={STERKROS.sign}
                  alt="Sterkros sign"
                  className="absolute bottom-0 left-0 h-auto w-full translate-y-[3%] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full overflow-hidden bg-bee-bg-primary">
          <DetailVideo
            src={STERKROS.logoAnimation}
            className="aspect-video w-full bg-bee-bg-primary py-4 md:py-8 lg:aspect-auto lg:h-[110vh] lg:py-16"
            fit="cover"
            muteToggle
            blendMode="screen"
          />
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <DetailVideo
            src={STERKROS.logoLineAnimation}
            className="aspect-video min-h-[280px] md:min-h-[360px] bg-white md:aspect-auto"
            fit="contain"
            muteToggle
          />
          <div className="grid min-h-[280px] md:min-h-[360px] place-items-center bg-bee-bg-card p-6 md:p-10">
            <DetailImage
              src={STERKROS.sign}
              alt="Sterkros sign"
              className="max-h-40 md:max-h-56 w-full object-contain"
            />
          </div>
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <blockquote className="max-w-[850px] text-heading-sm font-semibold leading-tight break-words">
            <span className="block text-[clamp(2rem,6vw,4rem)] leading-none text-bee-accent">
              &ldquo;
            </span>
            {sterkrosContent.quote}
            <span className="ml-2 text-[clamp(2rem,6vw,4rem)] leading-none text-bee-accent">
              &rdquo;
            </span>
          </blockquote>
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 sm:grid-cols-2">
            <DetailImage
              src={STERKROS.gymBag}
              alt="Sterkros gym bag"
              className="aspect-square w-full object-cover"
            />
            <DetailImage
              src={STERKROS.bottle}
              alt="Sterkros bottle"
              className="aspect-square w-full object-cover"
            />
            <DetailImage
              src={STERKROS.protein}
              alt="Sterkros protein packaging"
              className="aspect-square w-full object-cover"
            />
            <DetailVideo
              src={STERKROS.glitchVideo}
              className="aspect-square"
              fit="cover"
              muteToggle
            />
          </div>
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-section-label">
                <span aria-hidden>&bull;</span> Typeface
              </p>
              <h2 className="mt-3 text-testimonial-heading font-semibold">Sui Generis Regular</h2>
              <p className="mt-6 max-w-[760px] text-copy-lg text-white/80 md:mt-8">
                The Sui Generis font is a distinctive sans-serif typeface with technical letterforms
                and an industrial charm, making it versatile for display, headlines, logos, and
                packaging.
              </p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <DetailImage
                src={STERKROS.sign}
                alt="Sterkros sign"
                className="ml-auto h-16 md:h-20 object-contain"
              />
              <p className="sterkros-font break-all text-right text-base md:text-lg leading-tight text-white">
                ABCDEFGHIJKLMNOPQRSTV WXYZ abcdefghijklmnopqrstuv wxyz 0123456789
              </p>
            </div>
          </div>
          <h2 className="mt-10 text-testimonial-heading font-semibold md:mt-14">color</h2>
          <DetailImage
            src={STERKROS.colorCode}
            alt="Sterkros color palette"
            className="mt-4 w-full object-cover md:mt-6"
          />
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 md:grid-cols-2">
            <DetailImage
              src={STERKROS.watch}
              alt="Sterkros watch mockup"
              className="h-[280px] md:h-[360px] w-full rounded-card object-cover"
            />
            <DetailImage
              src={STERKROS.shirt}
              alt="Sterkros shirt"
              className="h-[280px] md:h-[360px] w-full rounded-card object-cover"
            />
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="w-full px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
            <p className="text-section-label">
              <span aria-hidden>&bull;</span> Props And Packaging
            </p>
            <h2 className="mt-3 max-w-[560px] text-testimonial-heading font-semibold md:mt-4">
              Your Packaging Design Will Stand Out.
            </h2>
          </div>
          <div className="mt-6 aspect-video w-full md:mt-8">
            <CompareSlider
              before={STERKROS.props}
              after={STERKROS.package}
              beforeAlt="Sterkros plain props"
              afterAlt="Sterkros packaging"
              className="bg-bee-bg-deep"
              fit="contain"
              handleColor="#dc2626"
              labelColor="text-red-600"
            />
          </div>
        </section>

        <section className="bg-bee-bg-deep px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg">
          <DetailVideo
            src={STERKROS.aboutVideo}
            className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full"
            fit="contain"
            muteToggle
          />
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <p className="max-w-[1120px] text-copy-lg text-white/80">
            Packaging design is key when designing branded merchandise offerings. Packaging can be
            as simple as wrapping or a logo placement, or as complex as an overall industrial design
            of the shape, form, application, and usage of your product.
          </p>
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 md:grid-cols-2">
            <DetailImage
              src={STERKROS.box}
              alt="Sterkros box packaging"
              className="h-[320px] md:h-[420px] w-full rounded-card object-cover"
            />
            <DetailVideo
              src={STERKROS.fingerGripVideo}
              className="h-[320px] md:h-[420px] rounded-card"
              fit="cover"
              muteToggle
            />
          </div>
        </section>

        <section className="px-section-x-sm py-6 sm:px-section-x-md lg:px-section-x-lg">
          <DetailImage
            src={STERKROS.wall}
            alt="Sterkros wall advertisement"
            className="w-full object-cover"
          />
        </section>

        <section className="px-section-x-sm py-10 text-center sm:px-section-x-md lg:px-section-x-lg">
          <h2 className="text-testimonial-heading font-extrabold">HUGE THANKS</h2>
          <p className="mt-2 text-title-fluid">{sterkrosContent.thanks}</p>
        </section>

        <NextWorkStrip workIds={["w4", "w7"]} />
      </main>
    </DetailVideoProvider>
  );
}
