import { useState, useRef } from "react";
import { classNames } from "../../../shared/lib/classNames";
import { ASSETS } from "../../../shared/lib/assets";
import { MARQUEE_LOGOS, TESTIMONIALS } from "../data/testimonials";

export function ClientsTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = TESTIMONIALS[activeIndex]!;

  function move(direction: 1 | -1) {
    setActiveIndex((i) => (i + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]!.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]!.clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      move(diff > 0 ? 1 : -1);
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="flex flex-col bg-bee-bg-primary px-section-x-sm pb-24 pt-6 text-white sm:px-section-x-md lg:px-section-x-lg"
    >
      <div id="clients" className="order-2 mt-24 w-full">
      {/* ── Section header ── */}
      <p className="py-1 font-normal text-xl text-white md:py-2 md:text-2xl xl:text-3xl">
        <span aria-hidden>•</span> Our client
      </p>
        <h2 className="mt-2 max-w-[430px] break-words text-[calc(clamp(2.1rem,4.3vw,4.2rem)-2px)] font-medium leading-[1.05]">
        Brands that <br /> trust Us
      </h2>

      {/*
       * Logo marquee strip.
       * Negative mx pulls it full-bleed past section padding.
       * Animation is defined in home.css under "1. MARQUEE".
       * The logo list is duplicated so the loop is seamless.
       */}
      <div className="-mx-section-x-sm mt-14 overflow-hidden sm:-mx-section-x-md lg:-mx-section-x-lg">
        <div className="marquee">
          {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, index) => (
            <img
              key={`${logo}-${index}`}
              src={logo}
              alt="Client logo"
              loading="lazy"
              decoding="async"
              className="marquee__logo"
            />
          ))}
        </div>
      </div>

      </div>

      {/* ── Testimonials ── */}
      <div id="testimonials" className="order-1 w-full">
        <p className="py-1 font-normal text-xl text-white md:py-2 md:text-2xl xl:text-3xl">
          <span aria-hidden>•</span> Client Testimonials & Reviews
        </p>
        <h2 className="mt-2 max-w-[800px] break-words text-[calc(clamp(2.1rem,4.3vw,4.2rem)-2px)] font-medium leading-[1.05]">
          What our happy clients <br /> say about us
        </h2>

        {/*
         * Panel grid: [ ‹ ] [ content ] [ › ]
         * On mobile the arrows are visible for accessibility and touch swipe works.
         */}
        <div className="relative mx-6 mt-8 sm:mx-8 md:mx-16 lg:mx-24">
          {/* Content panel */}
          <div
            ref={panelRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full rounded-3xl bg-bee-bg-card px-2 py-6 shadow-soft md:py-8 lg:py-12 touch-pan-x"
          >
            <div className="mb-8 mx-10 flex items-center justify-between md:mx-16 xl:mx-24">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => move(-1)}
                className="grid h-12 w-12 flex-none place-items-center bg-transparent text-5xl font-normal leading-none text-bee-accent transition hover:text-white"
              >
                &lt;
              </button>

              {/* ── Tabs (one per testimonial person) ── */}
              <div className="mx-4 grid min-w-0 w-[min(76%,900px)] flex-none grid-cols-3 justify-center gap-2 sm:gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={classNames(
                    // Base — Tailwind
                    "testimonial-tab min-w-0 flex cursor-pointer items-center gap-2 px-2 py-2 text-left text-white transition sm:gap-4",
                    // Active vs inactive opacity
                    index === activeIndex ? "testimonial-tab--active opacity-100" : "opacity-40",
                  )}
                >
                  <img
                    src={testimonial.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={classNames(
                      "testimonial-avatar h-10 w-10 flex-none rounded-pill object-cover sm:h-12 sm:w-12 lg:h-16 lg:w-16",
                      `testimonial-avatar--${testimonial.id}`,
                    )}
                  />
                  <span className="min-w-0">
                      <strong className="block text-xs font-normal leading-tight md:text-sm lg:text-base xl:text-lg">
                      {testimonial.name}
                    </strong>
                      <small className="mt-[3px] block text-[10px] font-light leading-snug opacity-80 lg:text-xs">
                      {testimonial.role}
                    </small>
                  </span>
                </button>
              ))}
              </div>

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => move(1)}
                className="grid h-12 w-12 flex-none place-items-center bg-transparent text-5xl font-normal leading-none text-bee-accent transition hover:text-white"
              >
                &gt;
              </button>
            </div>

            {/*
             * Body: [ portrait ] [ quote ]
             * Layout belongs to Tailwind; CSS only owns the active underline.
             */}
            <div className="mx-0 flex h-auto flex-row items-center md:mx-20 md:h-[270px]">
              <img
                src={active.avatar}
                alt={active.name}
                decoding="async"
                className={classNames(
                  "testimonial-avatar mx-2 h-4 w-0 flex-none object-cover xl:mx-24 xl:h-56 xl:w-56",
                  `testimonial-avatar--${active.id}`,
                )}
              />
              <blockquote className="testimonial-quote flex min-w-0 flex-row text-left text-sm font-light leading-relaxed text-white sm:text-base lg:text-lg xl:text-xl">
                <span className="testimonial-quote__row">
                  <img src={ASSETS.yellowQuotes} alt="quote icon" className="mx-2 h-4 w-4" />
                  <span className="pr-6 xl:pr-20">{active.quote}</span>
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
