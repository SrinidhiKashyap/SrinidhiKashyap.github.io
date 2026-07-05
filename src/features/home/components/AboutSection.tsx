import { ASSETS } from "../../../shared/lib/assets";

/**
 * AboutSection
 *
 * "Our Story" section on the homepage. Two-column layout with company
 * description on the left and a decorative image on the right.
 * On mobile, image stacks below the text.
 */
export function AboutSection() {
  return (
    <section id="about" className="bg-bee-bg-surface text-white">
      {/*
       * Two-column layout: text left, image right.
       * On mobile, image stacks below (grid-cols-1 is the default).
       */}
      <div className="grid min-h-[calc(100dvh-76px)] lg:grid-cols-2">

        {/* ── Left: copy ── */}
        <div className="flex items-center px-section-x-sm py-10 sm:px-section-x-md lg:px-section-x-lg">
          <div className="w-full max-w-[860px]">

            {/* Section label */}
            <p className="text-label font-normal">
              <span aria-hidden>•</span> Our Story
            </p>

            <h2 className="mt-6 max-w-[620px] text-heading-lg font-semibold sm:mt-8">
              Brief about <br /> work culture
            </h2>

            <div className="mt-6 max-w-[860px] space-y-6 text-copy-lg text-white/90 sm:mt-8 sm:space-y-7">
              <p>
                At BEE creative, we believe in the power of transformation. Just like how a bee
                collects nectar from flowers and turns it into golden honey, we gather ideas,
                insights, and goals from our clients and craft them into compelling, impactful
                narratives.
              </p>
              <p>
                We take pride in our collaborative approach, working hand-in-hand with clients to
                understand their unique needs. Whether it's a brand-new campaign or a fresh
                perspective on an established identity, BEE creative is here to turn your vision
                into reality.
              </p>
            </div>

            <button
              type="button"
              className="mt-6 rounded-pill bg-bee-accent px-8 py-3 text-base font-medium text-black transition hover:bg-white touch-target tap-highlight-transparent sm:mt-8 sm:px-9 sm:py-3.5"
            >
              About Us
            </button>
          </div>
        </div>

        {/* ── Right: image ── */}
        <div className="min-h-[280px] overflow-hidden lg:min-h-[420px]">
          <img
            src={ASSETS.centerGraphic}
            alt="Bee Concept mark"
            loading="lazy"
            decoding="async"
            className="h-full min-h-[280px] lg:min-h-[420px] w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
