import { useEffect, useRef, useState } from "react";
import { DetailImage } from "./DetailImage";
import { DetailVideo } from "./DetailVideo";
import { DetailVideoProvider } from "./DetailVideoProvider";
import { NextWorkStrip } from "./NextWorkStrip";

const ROOT = "/assets/work-uiux-detail";

const UIUX = {
  forestMockup: `${ROOT}/forest-mockup.webp`,
  redMockup: `${ROOT}/red-mockup.webp`,
  logoMockup: `${ROOT}/logo-mockup.webp`,
  icons: `${ROOT}/icons.svg`,
  appMockup: `${ROOT}/phone-hand.gif`,
  heroVideo: `${ROOT}/hero-sequence.mp4`,
  video: `${ROOT}/glimpse.mp4`,
  logoVideo: `${ROOT}/logo-animation.mp4`,
} as const;

const DEFINE_SCREENS = [
  `${ROOT}/screen-otp.jpg`,
  `${ROOT}/screen-home.jpg`,
  `${ROOT}/screen-product.jpg`,
  `${ROOT}/screen-cart.jpg`,
  `${ROOT}/screen-success.png`,
];

const DELIVER_LEFT_SCREENS = [
  `${ROOT}/screen-splash.png`,
  `${ROOT}/screen-otp.jpg`,
  `${ROOT}/screen-menu.jpg`,
  `${ROOT}/screen-product.jpg`,
  `${ROOT}/screen-cart.jpg`,
];

const DELIVER_RIGHT_SCREENS = [
  `${ROOT}/screen-login.jpg`,
  `${ROOT}/screen-signup.jpg`,
  `${ROOT}/screen-home.jpg`,
  `${ROOT}/screen-coupon.png`,
  `${ROOT}/screen-place-order.jpg`,
];

export function UiUxDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <HeroSection />
        <IntroSection />
        <TaskSection />
        <DefineSection />
        <BrandSystemSection />
        <IconSection />
        <DeliverSection />
        <NextWorkStrip workIds={["w5", "w9"]} />
      </main>
    </DetailVideoProvider>
  );
}

function HeroSection() {
  return (
    <>
      <section className="grid w-full grid-cols-[1.16fr_0.84fr] gap-0">
        <DetailVideo
          src={UIUX.heroVideo}
          className="h-[162px] w-full sm:h-[260px] lg:h-[390px]"
          fit="cover"
          priority
        />
        <div className="self-center px-7 py-5 sm:px-10 sm:py-8 lg:px-14">
          <h1 className="max-w-xl text-[20px] font-semibold leading-[0.98] sm:text-[30px]">
            Kaju Factory Android app
          </h1>
          <p className="mt-2 max-w-xl text-[11px] leading-[1.35] text-white/85 sm:mt-4 sm:text-base">
            Bee Concept revamped an ecommerce product experience with clear shopping flows, warm
            visuals, and a flexible UI system.
          </p>
          <h2 className="mt-2 text-[11px] font-semibold sm:mt-4 sm:text-base">
            Bee concept Scope of Work:
          </h2>
          <ul className="mt-1 space-y-0.5 text-[10px] leading-relaxed text-white/85 sm:mt-2 sm:text-sm">
            <li>&bull; UI/UX Design</li>
            <li>&bull; Interface Design</li>
            <li>&bull; Mobile App Prototype</li>
          </ul>
        </div>
      </section>

      <section>
        <DetailImage
          src={UIUX.forestMockup}
          alt="Kaju Factory app launch screen with cashew brand visual"
          className="h-[250px] w-full border-y-2 border-[#00aeef] object-cover sm:h-[420px] lg:h-[78vh]"
          priority
        />
      </section>
    </>
  );
}

function IntroSection() {
  return (
    <>
      <DetailImage
        src={UIUX.redMockup}
        alt="Kaju Factory app interface screens on red background"
        className="h-[320px] w-full object-cover sm:h-[500px] lg:h-[72vh]"
      />
      <section className="px-9 py-5 sm:px-14 sm:py-8 lg:px-20">
        <p className="mx-auto max-w-6xl text-[11px] leading-[1.35] text-white/80 sm:text-base">
          We crafted a cutting-edge ecommerce mobile application exclusively for dry fruits,
          delivering a seamless shopping experience with intuitive navigation, rich visuals, and
          user-friendly features.
        </p>
      </section>
      <DetailVideo
        src={UIUX.video}
        className="h-[193px] w-full bg-[#555] sm:h-[320px] lg:h-[56vh]"
        fit="cover"
      />
    </>
  );
}

function TaskSection() {
  return (
    <section className="px-9 py-5 sm:px-14 sm:py-8 lg:px-20 lg:py-14">
      <div className="max-w-6xl">
        <h2 className="text-[20px] font-semibold sm:text-[30px]">Our Task</h2>
        <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:text-base">
          Our mission was to completely revamp the digital identity of Kaju Factory while
          celebrating its legacy of premium quality and trust. The concept needed to create an
          ecommerce app that would modernize the brand&apos;s online presence and reflect its
          tradition of excellence.
        </p>
        <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:text-base">
          It was imperative to design an intuitive, visually engaging interface that could integrate
          product browsing, customization, and a hassle-free checkout without losing brand
          recognition.
        </p>
      </div>
    </section>
  );
}

function DefineSection() {
  return (
    <>
      <section className="px-9 py-5 sm:px-14 sm:py-8 lg:px-20 lg:py-14">
        <div className="max-w-6xl space-y-7 sm:space-y-10">
          <div>
            <h2 className="text-[20px] font-semibold sm:text-[30px]">
              The Challenge
            </h2>
            <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:text-base">
              Designing for the Kaju Factory application brought a unique set of challenges. The
              rapidly evolving food and retail market demanded a modern digital experience that
              preserved the brand&apos;s heritage and user expectations.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] font-semibold sm:text-[30px]">Define</h2>
            <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:text-base">
              Our process began with customer personas and purchase journeys tailored to Kaju
              Factory&apos;s audience. We designed workflows for browsing, ordering, and checkout
              while building a premium dry fruits experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] px-9 py-6 text-[#191919] sm:px-14 sm:py-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {DEFINE_SCREENS.map((src, index) => (
            <DetailImage
              key={src}
              src={src}
              alt={`Kaju Factory wireframe screen ${index + 1}`}
              className="mx-auto max-h-[720px] w-full max-w-[320px] object-contain"
            />
          ))}
        </div>
      </section>
    </>
  );
}

function BrandSystemSection() {
  return (
    <>
      <section className="grid min-h-[222px] grid-cols-2 bg-[#d9d9d9] sm:min-h-[360px] lg:min-h-[520px]">
        <div className="grid place-items-center bg-gradient-to-br from-[#c12027] to-[#cf6333] p-10">
          <DetailVideo
            src={UIUX.logoVideo}
            className="aspect-square w-full max-w-[420px] bg-transparent"
            fit="contain"
          />
        </div>
        <DetailImage
          src={UIUX.logoMockup}
          alt="Kaju Factory app icon on phone"
          className="h-full min-h-[222px] w-full object-cover object-right sm:min-h-[360px] lg:min-h-[420px]"
        />
      </section>

      <section className="px-9 py-5 sm:px-14 sm:py-10 lg:px-20 lg:py-16">
        <p className="text-[20px] font-semibold sm:text-section-label">
          <span aria-hidden>&bull;</span> Typeface
        </p>
        <h2 className="mt-6 text-[40px] font-semibold leading-none sm:mt-8 sm:text-[clamp(4rem,12vw,9rem)]">
          Poppins
        </h2>
        <div className="mt-4 max-w-6xl sm:mt-8">
          <h3 className="text-[20px] font-semibold leading-[1.02] sm:text-heading-sm">
            Why Poppins Typeface for Kaju Factory?
          </h3>
          <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:mt-4 sm:text-copy-lg">
            Poppins is a modern sans-serif typeface that aligns with contemporary digital design
            trends. Its clean geometry supports readability and a friendly premium brand voice
            across mobile interfaces.
          </p>
        </div>
      </section>

      <section className="px-9 pb-8 sm:px-14 sm:pb-14 lg:px-20">
        <div className="text-[40px] font-semibold leading-none sm:text-[clamp(4rem,12vw,9rem)]">
          Aa Aa Aa
        </div>
        <div className="mt-3 max-w-5xl space-y-2 text-[11px] sm:mt-6 sm:space-y-4 sm:text-copy-lg">
          <TypeRow weight="Bold" text="We bring you the world's best cashews" />
          <TypeRow weight="Medium" text="Experience the new kajufactory app" />
          <TypeRow weight="Regular" text="We bring you the world's best cashews" />
          <TypeRow weight="Light" text="Experience the new kajufactory app" />
        </div>
      </section>

      <section className="bg-[#232323] px-9 py-5 sm:px-14 sm:py-10 lg:px-20 lg:py-16">
        <p className="text-[20px] font-semibold sm:text-section-label">
          <span aria-hidden>&bull;</span> Color
        </p>
        <div className="mt-5 grid max-w-6xl grid-cols-[1.1fr_1fr] gap-1.5 sm:mt-10 sm:gap-3">
          <ColorCard
            className="min-h-[123px] bg-[#c12027] sm:min-h-[230px]"
            name="Fire Engine Red"
            hex="#C12027"
          />
          <div className="grid gap-3">
            <ColorCard
              className="min-h-[58px] bg-[#f9f9f9] text-[#191919] sm:min-h-[110px]"
              name="Snow Drift"
              hex="#F9F9F9"
            />
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
              <ColorCard
                className="min-h-[58px] bg-[#cf6333] sm:min-h-[110px]"
                name="Flame Pea"
                hex="#CF6333"
              />
              <ColorCard
                className="min-h-[58px] bg-[#28ae60] sm:min-h-[110px]"
                name="Jade Green"
                hex="#28AE60"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function IconSection() {
  return (
    <section className="bg-[#f9f9f9] px-9 py-10 text-[#191919] sm:px-14 sm:py-14 lg:px-20 lg:py-20">
      <h2 className="max-w-lg text-[20px] font-semibold leading-[1.05] sm:text-heading-sm">
        Iconography &amp; Illustrations
      </h2>
      <DetailImage
        src={UIUX.icons}
        alt="Kaju Factory iconography and illustration set"
        className="mx-auto mt-10 w-full max-w-6xl object-contain sm:mt-12"
      />
    </section>
  );
}

function DeliverSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [handPinned, setHandPinned] = useState(false);
  const handPinnedRef = useRef(false);

  useEffect(() => {
    let animationFrame = 0;

    const updateHandPosition = () => {
      animationFrame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const bounds = section.getBoundingClientRect();
      const shouldPin = bounds.top <= 76 && bounds.bottom > window.innerHeight;
      if (shouldPin === handPinnedRef.current) return;

      handPinnedRef.current = shouldPin;
      setHandPinned(shouldPin);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateHandPosition);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#171717] px-section-x-sm py-14 sm:px-section-x-md lg:px-section-x-lg lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-[22rem] bottom-0 bg-[#c12027]" />
        <div className="absolute -bottom-[12%] left-1/2 h-[68%] w-[130%] -translate-x-1/2 rounded-t-[50%] bg-[#d7282c]" />
      </div>

      <div className="relative z-10 max-w-[350px]">
        <p className="text-[20px] font-semibold sm:text-section-label">
          <span aria-hidden>&bull;</span> Deliver
        </p>
        <p className="mt-2 text-[11px] leading-[1.35] text-white/80 sm:mt-4 sm:text-base">
          We maintained the right balance of colors and elements, keeping the look impressive and
          clickable after a playful splash screen, clean dashboard, and crisp information structure.
        </p>
      </div>

      <img
        src={UIUX.appMockup}
        alt="Hand holding Kaju Factory phone"
        className={`pointer-events-none z-20 w-[68%] max-w-[620px] -translate-x-1/2 ${handPinned ? "fixed bottom-0 left-1/2" : "absolute bottom-0 left-1/2"}`}
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-10 mt-10 grid grid-cols-2 gap-x-12 sm:mt-14 sm:gap-x-20 lg:gap-x-28">
        <div className="space-y-8 sm:space-y-12">
          {DELIVER_LEFT_SCREENS.map((src, index) => (
            <DetailImage
              key={src}
              src={src}
              alt={`Kaju Factory delivered screen ${index + 1}`}
              className="w-[78%] max-w-[440px] justify-self-start rounded-[14px] shadow-xl"
              priority={index === 0}
            />
          ))}
        </div>
        <div className="space-y-8 pt-20 sm:space-y-12 sm:pt-28 lg:pt-36">
          {DELIVER_RIGHT_SCREENS.map((src, index) => (
            <DetailImage
              key={src}
              src={src}
              alt={`Kaju Factory delivered screen ${index + 6}`}
              className="ml-auto w-[78%] max-w-[440px] rounded-[14px] shadow-xl"
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeRow({ weight, text }: { weight: string; text: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
      <span className="font-semibold">Title</span>
      <span className="border-l-2 border-[#c12027] pl-4">{text}</span>
      <span>{weight}</span>
    </div>
  );
}

function ColorCard({ className, name, hex }: { className: string; name: string; hex: string }) {
  return (
    <div
      className={`rounded-[8px] p-2 text-[13px] font-semibold sm:rounded-card sm:p-6 sm:text-2xl ${className}`}
    >
      <p>{name}</p>
      <p>{hex}</p>
    </div>
  );
}
