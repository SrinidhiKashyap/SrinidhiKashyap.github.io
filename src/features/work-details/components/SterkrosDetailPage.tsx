import { sterkrosAssets as STERKROS, sterkrosContent } from "../data/sterkrosDetail";
import {
  CompareSlider,
  DetailImage,
  DetailVideo,
  DetailVideoProvider,
  NextWorkStrip,
} from "./";

export function SterkrosDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-8 px-section-x-sm py-8 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:px-section-x-lg lg:gap-10 lg:py-10">
          <DetailVideo src={STERKROS.glimpseVideo} className="min-h-[280px] md:min-h-[360px]" fit="cover" priority muteToggle />
          <div>
            <h1 className="text-heading-sm font-semibold">{sterkrosContent.title}</h1>
            <p className="mt-4 text-copy-lg text-white/85">{sterkrosContent.intro}</p>
            <p className="mt-4 text-copy-lg text-white/85">{sterkrosContent.introAlt}</p>
            <h2 className="mt-5 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed text-white/85 md:mt-3 md:text-base">
              {sterkrosContent.scope.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label"><span aria-hidden>&bull;</span> Brand Identity</p>
          <h2 className="mt-4 text-heading-sm font-semibold">Explore the Process</h2>
          <div className="mt-6 space-y-4 text-copy-lg text-white/80 md:mt-8 md:space-y-6">
            <p>
              The process began with a comprehensive analysis of the Sterkros group's values,
              mission, and target audience. This initial research laid the foundation for developing
              a branding strategy that aligned with the team's goals and resonated with their market.
            </p>
            <p>
              The language was carefully crafted around the title symbol, coupled with triangle ways
              of the &ldquo;S&rdquo;, creating a recognizable visual symbol for the fitness team.
            </p>
          </div>
          <div className="mt-8 grid border-y border-white/60 py-6 text-center md:mt-10 md:py-8 md:grid-cols-3">
            <div>
              <h3 className="text-title-fluid">Guide lines</h3>
              <DetailImage src={STERKROS.guideline} alt="Sterkros guidelines" className="mx-auto mt-8 h-20 md:mt-12 md:h-28 object-contain" />
            </div>
            <div>
              <h3 className="text-title-fluid">Logo type</h3>
              <DetailImage src={STERKROS.logo} alt="Sterkros logo type" className="mx-auto mt-8 h-20 md:mt-12 md:h-28 object-contain" />
            </div>
            <div>
              <h3 className="text-title-fluid">Sign</h3>
              <DetailImage src={STERKROS.sign} alt="Sterkros sign" className="mx-auto mt-8 h-28 md:mt-12 md:h-40 object-contain" />
            </div>
          </div>
        </section>

        <section className="bg-bee-bg-deep px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg">
          <DetailVideo src={STERKROS.logoAnimation} className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full" fit="contain" muteToggle />
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <DetailVideo src={STERKROS.logoLineAnimation} className="aspect-video min-h-[280px] md:min-h-[360px] bg-white md:aspect-auto" fit="contain" muteToggle />
          <div className="grid min-h-[280px] md:min-h-[360px] place-items-center bg-bee-bg-card p-6 md:p-10">
            <DetailImage src={STERKROS.sign} alt="Sterkros sign" className="max-h-40 md:max-h-56 w-full object-contain" />
          </div>
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <blockquote className="max-w-[850px] text-heading-sm font-semibold leading-tight break-words">
            <span className="block text-[clamp(2rem,6vw,4rem)] leading-none text-bee-accent">&ldquo;</span>
            {sterkrosContent.quote}
            <span className="ml-2 text-[clamp(2rem,6vw,4rem)] leading-none text-bee-accent">&rdquo;</span>
          </blockquote>
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 sm:grid-cols-2">
            <DetailImage src={STERKROS.gymBag} alt="Sterkros gym bag" className="aspect-square w-full object-cover" />
            <DetailImage src={STERKROS.bottle} alt="Sterkros bottle" className="aspect-square w-full object-cover" />
            <DetailImage src={STERKROS.protein} alt="Sterkros protein packaging" className="aspect-square w-full object-cover" />
            <DetailVideo src={STERKROS.glitchVideo} className="aspect-square" fit="cover" muteToggle />
          </div>
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-section-label"><span aria-hidden>&bull;</span> Typeface</p>
              <h2 className="mt-3 text-testimonial-heading font-semibold">Sui Generis Regular</h2>
              <p className="mt-6 max-w-[760px] text-copy-lg text-white/80 md:mt-8">
                The Sui Generis font is a distinctive sans-serif typeface with technical letterforms
                and an industrial charm, making it versatile for display, headlines, logos, and packaging.
              </p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <DetailImage src={STERKROS.sign} alt="Sterkros sign" className="ml-auto h-16 md:h-20 object-contain" />
              <p className="sterkros-font break-all text-right text-base md:text-lg leading-tight text-white">
                ABCDEFGHIJKLMNOPQRSTV WXYZ abcdefghijklmnopqrstuv wxyz 0123456789
              </p>
            </div>
          </div>
          <h2 className="mt-10 text-testimonial-heading font-semibold md:mt-14">color</h2>
          <DetailImage src={STERKROS.colorCode} alt="Sterkros color palette" className="mt-4 w-full object-cover md:mt-6" />
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 md:grid-cols-2">
            <DetailImage src={STERKROS.watch} alt="Sterkros watch mockup" className="h-[280px] md:h-[360px] w-full rounded-card object-cover" />
            <DetailImage src={STERKROS.shirt} alt="Sterkros shirt" className="h-[280px] md:h-[360px] w-full rounded-card object-cover" />
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="w-full px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
            <p className="text-section-label"><span aria-hidden>&bull;</span> Props And Packaging</p>
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
          <DetailVideo src={STERKROS.aboutVideo} className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full" fit="contain" muteToggle />
        </section>

        <section className="w-full px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <p className="max-w-[1120px] text-copy-lg text-white/80">
            Packaging design is key when designing branded merchandise offerings. Packaging can be
            as simple as wrapping or a logo placement, or as complex as an overall industrial design
            of the shape, form, application, and usage of your product.
          </p>
          <div className="mt-8 grid gap-6 md:mt-10 md:gap-8 grid-cols-1 md:grid-cols-2">
            <DetailImage src={STERKROS.box} alt="Sterkros box packaging" className="h-[320px] md:h-[420px] w-full rounded-card object-cover" />
            <DetailVideo src={STERKROS.fingerGripVideo} className="h-[320px] md:h-[420px] rounded-card" fit="cover" muteToggle />
          </div>
        </section>

        <section className="px-section-x-sm py-6 sm:px-section-x-md lg:px-section-x-lg">
          <DetailImage src={STERKROS.wall} alt="Sterkros wall advertisement" className="w-full object-cover" />
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
