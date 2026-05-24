import { useState } from "react";
import { classNames } from "../../../shared/lib/classNames";
import { marqueeLogos, testimonials } from "../data/homeContent";

export function ClientsTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];

  function move(direction: 1 | -1) {
    setActiveIndex((i) => (i + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section id="clients" className="bg-bee-bg-primary px-section-x-sm pb-24 pt-6 text-white sm:px-section-x-md lg:px-section-x-lg">

      {/* ── Section header ── */}
      <p className="text-label font-normal">
        <span aria-hidden>•</span> Our client
      </p>
      <h2 className="mt-7 max-w-[430px] text-heading-md font-semibold">
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
          {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
            <img
              key={`${logo}-${index}`}
              src={logo}
              alt="Client logo"
              className="marquee__logo"
            />
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div id="testimonials" className="mt-24 w-full">
        <p className="text-section-label font-normal">
          <span aria-hidden>•</span> Client Testimonials &amp; Reviews
        </p>
        <h2 className="mt-3 max-w-[620px] text-testimonial-heading font-semibold">
          What our happy clients <br /> say about us
        </h2>

        {/*
         * Panel grid: [ ‹ ] [ content ] [ › ]
         * On mobile the arrows are hidden and the grid collapses — see home.css.
         */}
        <div className="relative mt-8">

          {/* Content panel */}
          <div className="relative min-h-[360px] w-full rounded-card bg-bee-bg-card px-6 py-8 shadow-soft sm:px-12 lg:px-20">

            {/* Previous arrow */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => move(-1)}
              className="absolute left-4 top-9 z-10 hidden h-[30px] w-[30px] place-items-center rounded-pill bg-bee-bg-deep text-2xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep md:grid"
            >
              &#8249;
            </button>

            {/* Next arrow */}
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => move(1)}
              className="absolute right-4 top-9 z-10 hidden h-[30px] w-[30px] place-items-center rounded-pill bg-bee-bg-deep text-2xl leading-none text-bee-accent transition hover:bg-bee-accent hover:text-bee-bg-deep md:grid"
            >
              &#8250;
            </button>

            {/* ── Tabs (one per testimonial person) ── */}
            <div className="flex items-center justify-center gap-8 overflow-x-auto px-9 pb-[18px] lg:gap-14">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={classNames(
                    // Base — Tailwind
                    "testimonial-tab flex min-w-[190px] items-center gap-3 text-left text-white transition",
                    // Active vs inactive opacity
                    index === activeIndex ? "testimonial-tab--active opacity-100" : "opacity-40",
                  )}
                >
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="h-12 w-12 flex-none rounded-pill object-cover"
                  />
                  <span className="min-w-0">
                    <strong className="block text-[0.82rem] font-semibold leading-tight">
                      {testimonial.name}
                    </strong>
                    <small className="mt-[3px] block text-[0.68rem] leading-snug opacity-80">
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
            <div className="mx-auto mt-12 grid max-w-[1120px] items-center gap-9 md:grid-cols-[190px_minmax(0,1fr)] lg:gap-24">
              <img
                src={active.avatar}
                alt={active.name}
                className="aspect-square w-full max-w-[190px] justify-self-center object-cover"
              />
              <blockquote className="max-w-[760px] text-testimonial-quote font-medium text-white">
                {/* Opening quotation mark */}
                <span className="mr-2 text-[2.2rem] leading-none text-bee-accent" aria-hidden>
                  &ldquo;
                </span>
                {active.quote}
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
