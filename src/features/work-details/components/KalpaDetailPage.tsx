import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { kalpaAssets as KALPA, kalpaContent } from "../data/kalpaDetail";
import { CompareSlider, DetailImage, DetailVideo, DetailVideoProvider } from "./";
import { WorkDetailHero } from "./WorkDetailHero";

function QuoteBlock({ children, topPadding = false }: { children: ReactNode; topPadding?: boolean }) {
  return (
    <section className={`relative px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16 ${topPadding ? "" : "pt-6 lg:pt-10"}`}>
      <blockquote className="mx-auto block max-w-5xl text-heading-sm font-medium leading-tight">
        <span className="text-bee-accent">&ldquo;</span>{children}<span className="text-bee-accent">&rdquo;</span>
      </blockquote>
    </section>
  );
}

function IdentityBlock({ number, title, children, className }: { number: string; title: string; children: ReactNode; className: string }) {
  return (
    <div className={`flex w-full flex-col justify-center px-section-x-sm py-10 text-black sm:px-section-x-md lg:px-section-x-lg lg:py-16 ${className}`}>
      <div className="flex-none"><span className="rounded-pill bg-[#efefee] px-3 py-2.5 text-sm font-medium">{number}</span></div>
      <h2 className="mt-4 text-heading-sm font-medium tracking-tight">Identity <span className="text-yellow-400">→</span> {title}</h2>
      <div className="mt-6 space-y-6 text-copy-lg text-black/80">{children}</div>
    </div>
  );
}

export function KalpaDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <WorkDetailHero
          videoSrc={KALPA.heroVideo}
          title={<>Kalpa organic<br />Oil Product</>}
          description={<p>{kalpaContent.intro}</p>}
          scope={kalpaContent.scope}
        />

        <QuoteBlock>{kalpaContent.quote}</QuoteBlock>
        <DetailImage src={KALPA.mainPoster} alt="Typography design with gold text" className="h-full w-full object-cover" priority />
        <section className="flex flex-col gap-4 px-section-x-sm py-10 sm:flex-row sm:px-section-x-md lg:gap-8 lg:px-section-x-lg lg:py-16">
          <DetailVideo src={KALPA.introVideo} className="h-full w-full sm:w-[60%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" fit="cover" />
          <DetailImage src={KALPA.flyingBottle} alt="Oil bottles" className="h-full w-full object-cover sm:w-[40%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" />
        </section>
        <section>
          <div className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16"><p className="text-section-label">• Brand Identity</p><h2 className="mt-3 text-heading-sm font-semibold md:mt-4">Explore the Process</h2></div>
          <DetailVideo src={KALPA.logoFormVideo} className="w-full" fit="cover" />
        </section>

        <section className="min-h-screen bg-white">
          <div className="flex flex-col md:flex-row">
            <DetailImage src={KALPA.storeSign} alt="Kalpa store sign" className="h-auto w-full object-cover md:h-[600px] md:w-[45%]" />
            <IdentityBlock number="01" title="General View" className="md:w-[55%]"><p>This design approach embraces simplicity, clean lines, and a focus on essential elements. It seeks to eliminate excessive ornamentation and unnecessary details, green and blue color used to create a calm and gentle atmosphere.</p><p>The color palette is inspired by textures and colors of nature forms and helps to build a visually appealing and well-balanced design.</p></IdentityBlock>
          </div>
          <div className="flex flex-col-reverse md:flex-row">
            <IdentityBlock number="02" title="Elements" className="md:w-[45%]"><p>The Kalpa logo is a harmonious blend of symbols representing the essence of coconut oil. A drop at the heart of the design signifies the pure oil extracted with care. The sun radiates the promise of natural goodness in every drop. The coconut tree, a timeless emblem of purity and abundance, stands tall, symbolizing their commitment to quality and tradition. Together, these elements create a visual narrative that reflects the purity, freshness, and natural essence of Kalpa coconut oil.</p></IdentityBlock>
            <DetailImage src={KALPA.letterhead} alt="Kalpa identity elements" className="h-full w-full object-cover md:h-[700px] md:w-[55%] lg:h-[680px]" />
          </div>
        </section>

        <QuoteBlock topPadding>{kalpaContent.guidelineQuote}</QuoteBlock>
        <section className="px-section-x-sm sm:px-section-x-md lg:px-section-x-lg"><div className="relative"><p className="absolute pt-4 text-section-label lg:pt-6">color</p><DetailImage src={KALPA.colorPalette} alt="Kalpa color palette" className="w-full object-cover xl:h-screen" /></div></section>
        <section className="px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg lg:py-16">
          <p className="text-section-label">• Typeface</p>
          <div className="mt-3 flex items-start justify-between gap-6 md:mt-4"><h2 className="text-heading-sm font-semibold">Goku Stencil</h2><Link to="/contact" className="shrink-0 rounded-pill bg-yellow-500 px-4 py-2 text-sm font-medium text-black transition hover:scale-105 hover:bg-yellow-400 lg:px-6 lg:py-3">Contact Us</Link></div>
          <div className="mt-6 md:mt-8 md:flex md:items-center md:justify-between md:gap-8"><p className="max-w-[760px] text-copy-lg text-white/85 md:w-[55%]">The Goku Stencil font is a typeface inspired by the aesthetics of stencil designs and, potentially, the popular anime character Goku from Dragon Ball. It often features bold, clean lines and cut-out sections that give it a stencil effect, making it suitable for use in logos, posters, and designs requiring a strong, impactful look.</p><DetailImage src={KALPA.typeSample} alt="Goku Stencil character set" className="mt-6 h-[12vh] object-contain md:mt-0 md:h-[15vh]" /></div>
        </section>

        <DetailVideo src={KALPA.logoAnimationVideo} className="w-full" fit="cover" />
        <section className="flex flex-col gap-4 px-section-x-sm py-10 sm:flex-row sm:px-section-x-md lg:gap-8 lg:px-section-x-lg lg:py-16"><DetailImage src={KALPA.bottleBox} alt="Oil bottles" className="h-full w-full object-cover sm:w-[40%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" /><DetailVideo src={KALPA.patternVideo} className="h-full w-full sm:w-[60%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" fit="cover" /></section>
        <DetailImage src={KALPA.threeBottles} alt="Kalpa bottle series" className="h-full w-full object-cover lg:h-screen" />
        <section className="flex flex-col gap-4 px-section-x-sm py-10 sm:flex-row sm:px-section-x-md lg:gap-8 lg:px-section-x-lg lg:py-16"><DetailImage src={KALPA.businessCards} alt="Visiting cards" className="h-full w-full object-cover sm:w-[40%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" /><DetailImage src={KALPA.bottles} alt="Oil bottles" className="h-full w-full object-cover sm:w-[60%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" /></section>
        <CompareSlider before={KALPA.props} after={KALPA.package} beforeAlt="Props" afterAlt="Package" afterLabel="Package" className="h-[56.25vw] max-h-screen" handleColor="#70ab3b" labelColor="text-black" />
        <section className="flex flex-col gap-4 px-section-x-sm py-10 sm:flex-row sm:px-section-x-md lg:gap-8 lg:px-section-x-lg lg:py-16"><DetailVideo src={KALPA.bottleVideo} className="h-full w-full sm:w-[60%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" fit="cover" /><DetailImage src={KALPA.bag} alt="Oil bottles" className="h-full w-full object-cover sm:w-[40%] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]" /></section>
      </main>
    </DetailVideoProvider>
  );
}
