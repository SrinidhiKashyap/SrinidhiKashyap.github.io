import { useState, useRef } from "react";
import { classNames } from "../../../shared/lib/classNames";
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
      <p className="py-1 font-normal text-2xl text-white md:py-2 md:text-3xl xl:text-4xl">
        <span aria-hidden>•</span> Our client
      </p>
      <h2 className="mt-2 max-w-[430px] break-words text-heading-md font-medium">
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
        <p className="py-1 font-normal text-2xl text-white md:py-2 md:text-3xl xl:text-4xl">
          <span aria-hidden>•</span> Client Testimonials & Reviews
        </p>
        <h2 className="mt-2 max-w-[620px] break-words text-testimonial-heading font-medium">
          What our happy clients <br /> say about us
        </h2>

        {/*
         * Panel grid: [ ‹ ] [ content ] [ › ]
         * On mobile the arrows are visible for accessibility and touch swipe works.
         */}
        <div className="relative mx-3 mt-8">
          {/* Content panel */}
          <div
            ref={panelRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative min-h-[600px] w-full rounded-3xl bg-bee-bg-card px-2 py-6 shadow-soft md:py-8 lg:py-12 touch-pan-x"
          >
            {/* Previous arrow */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => move(-1)}
              className="absolute left-1 top-5 z-10 h-14 w-14 place-items-center rounded-pill bg-bee-bg-deep text-3xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep touch-target tap-highlight-transparent md:hidden"
            >
              &#8249;
            </button>

            {/* Next arrow */}
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => move(1)}
              className="absolute right-1 top-5 z-10 h-14 w-14 place-items-center rounded-pill bg-bee-bg-deep text-3xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep touch-target tap-highlight-transparent md:hidden"
            >
              &#8250;
            </button>

            {/* Desktop arrows */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => move(-1)}
              className="absolute left-0 top-5 z-10 hidden h-10 w-10 place-items-center rounded-pill bg-bee-bg-deep text-3xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep md:top-9 md:grid lg:top-[52px] xl:left-12"
            >
              &#8249;
            </button>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => move(1)}
              className="absolute right-0 top-5 z-10 hidden h-10 w-10 place-items-center rounded-pill bg-bee-bg-deep text-3xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep md:top-9 md:grid lg:top-[52px] xl:right-12"
            >
              &#8250;
            </button>

            {/* ── Tabs (one per testimonial person) ── */}
            <div className="mx-10 grid grid-cols-3 gap-6 pb-[18px] md:mx-16 xl:mx-24">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={classNames(
                    // Base — Tailwind
                    "testimonial-tab min-w-0 flex items-center gap-3 text-left text-white transition",
                    // Active vs inactive opacity
                    index === activeIndex ? "testimonial-tab--active opacity-100" : "opacity-40",
                  )}
                >
                  <img
                    src={testimonial.avatar}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 flex-none rounded-pill object-cover"
                  />
                  <span className="min-w-0">
                    <strong className="block text-[20px] font-medium leading-tight">
                      {testimonial.name}
                    </strong>
                    <small className="mt-[3px] block text-[0.95rem] leading-snug opacity-80">
                      {testimonial.role}
                    </small>
                  </span>
                </button>
              ))}
            </div>

            {/*
             * Body: [ portrait ] [ quote ]
             * Layout belongs to Tailwind; CSS only owns the active underline.
             */}
            <div className="mx-auto mt-16 grid max-w-[1120px] items-center gap-9 md:grid-cols-[280px_minmax(0,1fr)] md:gap-x-40">
              <img
                src={active.avatar}
                alt={active.name}
                decoding="async"
                className="aspect-square w-full max-w-[280px] justify-self-center object-cover"
              />
              <blockquote className="testimonial-quote max-w-[760px] text-[28px] font-normal leading-relaxed text-white">
                {active.quote}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
