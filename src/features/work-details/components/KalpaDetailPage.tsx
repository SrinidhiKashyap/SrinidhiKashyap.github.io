import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { kalpaAssets as KALPA, kalpaContent } from "../data/kalpaDetail";
import {
  CompareSlider,
  DetailImage,
  DetailVideo,
  DetailVideoProvider,
  NextWorkStrip,
} from "./detailMedia";

function ProcessTile({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white px-section-x-sm py-12 text-black sm:px-section-x-md lg:px-16">
      <span className="inline-grid h-8 w-8 place-items-center rounded-pill bg-black/10 text-xs font-semibold">
        {number}
      </span>
      <h3 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
        Identity<span className="text-bee-accent">-&gt;</span>{title}
      </h3>
      <p className="mt-7 max-w-[620px] text-base leading-relaxed text-black/75">{children}</p>
    </div>
  );
}

function QuoteBlock({ children }: { children: ReactNode }) {
  return (
    <section className="px-section-x-sm py-14 sm:px-section-x-md lg:px-section-x-lg">
      <blockquote className="max-w-[1080px] text-heading-sm font-semibold leading-tight">
        <span className="block text-[5rem] leading-none text-bee-accent">&ldquo;</span>
        {children}
        <span className="ml-20 text-[5rem] leading-none text-bee-accent">&rdquo;</span>
      </blockquote>
    </section>
  );
}

export function KalpaDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <section className="grid w-full gap-10 px-section-x-sm py-10 sm:px-section-x-md lg:grid-cols-[1.25fr_0.9fr] lg:px-section-x-lg">
          <DetailVideo src={KALPA.heroVideo} className="min-h-[360px]" fit="cover" priority />
          <div className="self-center">
            <h1 className="text-heading-sm font-semibold">Kalpa organic <br />Oil Product</h1>
            <p className="mt-5 text-copy-lg text-white/85">{kalpaContent.intro}</p>
            <h2 className="mt-7 text-title-fluid font-semibold">Bee concept Scope of Work:</h2>
            <ul className="mt-3 space-y-1 text-base leading-relaxed text-white/85">
              {kalpaContent.scope.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <QuoteBlock>{kalpaContent.quote}</QuoteBlock>

        <section className="bg-cover bg-center px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg" style={{ backgroundImage: `url(${KALPA.brickWall})` }}>
          <div className="mx-auto max-w-[980px] border-[6px] border-[#222] bg-[#ccefb0] shadow-card-lg">
            <DetailImage src={KALPA.mainPoster} alt="Kalpa nature billboard design" className="w-full object-cover" priority />
          </div>
        </section>

        <section className="grid gap-10 px-section-x-sm py-14 sm:px-section-x-md md:grid-cols-[1.1fr_0.9fr] lg:px-section-x-lg">
          <DetailVideo src={KALPA.logoBackgroundVideo} className="aspect-square bg-[#70ab3b]" fit="cover" playOverlay />
          <DetailImage src={KALPA.flyingBottle} alt="Kalpa bottle and box render" className="aspect-square w-full object-cover" />
        </section>

        <section className="px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label"><span aria-hidden>&bull;</span> Brand Identity</p>
          <h2 className="mt-4 text-testimonial-heading font-semibold">Explore the Process</h2>
        </section>

        <section className="mt-8 bg-[#0b2a4c]">
          <DetailVideo src={KALPA.logoFormVideo} className="mx-auto aspect-video max-h-[calc(100svh-120px)] w-full" fit="contain" playOverlay />
        </section>

        <section className="grid md:grid-cols-2">
          <DetailImage src={KALPA.storeSign} alt="Kalpa storefront sign" className="h-full min-h-[420px] w-full object-cover" />
          <ProcessTile number="01" title="General View">
            This design approach embraces simplicity, clean lines, and a focus on essential elements. It seeks to eliminate excessive ornamentation and unnecessary details, with green and blue color used to create a calm and gentle atmosphere.
            <br /><br />
            The color palette is inspired by textures and colors of nature forms and helps to build a visually appealing and well-balanced design.
          </ProcessTile>
          <ProcessTile number="02" title="Elements">
            The Kalpa logo is a harmonious blend of symbols representing the essence of coconut oil. A drop at the heart of the design signifies the pure oil extracted with care. The sun radiates the promise of natural goodness in every drop. The coconut tree, a timeless emblem of purity and abundance, stands tall, symbolizing their commitment to quality and tradition.
          </ProcessTile>
            <DetailImage src={KALPA.letterhead} alt="Kalpa pattern application" className="h-full min-h-[420px] w-full object-cover" />
          
        </section>

        <QuoteBlock>{kalpaContent.guidelineQuote}</QuoteBlock>

        <section className="px-section-x-sm pb-12 sm:px-section-x-md lg:px-section-x-lg">
          <h2 className="text-testimonial-heading font-semibold">color</h2>
          <div className="mt-8 grid min-h-[290px] overflow-hidden md:grid-cols-[1.4fr_0.55fr_0.55fr]">
            <div className="flex items-end bg-[#0b2145]" style={{ backgroundImage: `url(${KALPA.clouds})`, backgroundSize: "cover", backgroundPosition: "top" }}>
              <div className="h-1/2 w-full bg-[#0b2145] p-6 text-right text-sm">Blue Zodiac<br />#0B2145</div>
            </div>
            <div className="flex items-end bg-[#e7e4e4]" style={{ backgroundImage: `url(${KALPA.clouds})`, backgroundSize: "cover", backgroundPosition: "top" }}>
              <div className="h-1/2 w-full bg-[#e7e4e4] p-6 text-right text-sm text-black">Mercury<br />#E7E4E4</div>
            </div>
            <div className="flex items-end bg-[#70ab3b]" style={{ backgroundImage: `url(${KALPA.leaf})`, backgroundSize: "cover", backgroundPosition: "top" }}>
              <div className="h-1/2 w-full bg-[#70ab3b] p-6 text-right text-sm text-black">Leaf<br />#70AB3B</div>
            </div>
          </div>
        </section>

        <section className="px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label"><span aria-hidden>&bull;</span> Typeface</p>
          <div className="mt-5 grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="kalpa-display text-testimonial-heading font-black">Goku Stencil</h2>
              <p className="mt-6 max-w-[760px] text-copy-lg text-white/80">
                The Goku Stencil font is a bold display face with clean stencil cuts, making it suitable for logos, posters, and designs requiring a strong, impactful look.
              </p>
            </div>
            <div className="self-center text-right">
              <Link to="/contact" className="rounded-pill bg-bee-accent px-5 py-2 text-sm font-semibold text-black transition hover:bg-white">
                Contact Us
              </Link>
              <p className="kalpa-display mt-8 break-all text-lg font-black leading-tight">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          </div>
        </section>

        <section className=" px-section-x-sm py-12 text-center sm:px-section-x-md lg:px-section-x-lg">
          <DetailVideo src={KALPA.logoAnimationVideo}  fit="cover"  />
          <h2 className="kalpa-display -mt-16 text-heading-sm font-black">LOGO Animation</h2>
        </section>

        <section className="grid gap-10 px-section-x-sm py-14 sm:px-section-x-md md:grid-cols-[0.8fr_1.2fr] lg:px-section-x-lg">
          <DetailImage src={KALPA.bottleBox} alt="Kalpa bottle and carton" className="aspect-square w-full object-cover max-h-[500px]" />
          <DetailVideo src={KALPA.patternVideo} className="aspect-square w-full object-cover max-h-[500px]"   />
        </section>

        <section>
          <DetailImage src={KALPA.threeBottles} alt="Kalpa bottle series" className="w-full object-cover" />
        </section>

        <section className="grid gap-10 px-section-x-sm py-14 sm:px-section-x-md md:grid-cols-[0.85fr_1.15fr] lg:px-section-x-lg">
          <DetailImage src={KALPA.posterSingle} alt="Kalpa pure coconut poster" className="aspect-[4/3] w-full object-cover" />
          <DetailImage src={KALPA.businessCards} alt="Kalpa business cards" className="aspect-[4/3] w-full object-cover" />
        </section>

        <section className="aspect-[16/9] min-h-[360px]">
          <CompareSlider
            before={KALPA.posterCoconut}
            after={KALPA.posterNature}
            beforeAlt="Kalpa props model"
            afterAlt="Kalpa packaging model"
            className="bg-[#e9dfd3]"
            handleColor="#0b2a4c"
          />
        </section>

        <section className="grid gap-10 px-section-x-sm py-14 sm:px-section-x-md md:grid-cols-[1.2fr_0.8fr] lg:px-section-x-lg">
          <DetailVideo src={KALPA.bottleVideo} className="aspect-square bg-white" fit="cover" playOverlay />
          <DetailImage src={KALPA.bag} alt="Kalpa tote bag" className="aspect-square w-full object-cover" />
        </section>

                <section className="aspect-[16/9] min-h-[360px]">
          <CompareSlider
            before={KALPA.patternGreen}
            after={KALPA.patternGrey}
            beforeAlt="Kalpa props model"
            afterAlt="Kalpa packaging model"
            className="bg-[#e9dfd3]"
            handleColor="#0b2a4c"
          />
        </section>

        <section className="px-section-x-sm py-12 text-center sm:px-section-x-md lg:px-section-x-lg">
          <h2 className="text-testimonial-heading font-extrabold">THANKS</h2>
          <p className="mt-2 text-title-fluid">{kalpaContent.thanks}</p>
        </section>

        <NextWorkStrip workIds={["w1", "w7"]} />
      </main>
    </DetailVideoProvider>
  );
}
