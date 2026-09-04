/**
 * HeroSection
 *
 * Full-viewport hero on the homepage with the "Bee Concept" title,
 * tagline, and a scroll-down chevron button that scrolls to #about.
 */
export function HeroSection() {
  function scrollToAbout() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="home"
      className="relative grid min-h-[calc(100dvh-76px)] place-items-center overflow-hidden bg-bee-bg-hero px-section-x-sm text-center text-white sm:px-section-x-md lg:px-section-x-lg"
    >
      <div className="flex min-h-[calc(100dvh-76px)] w-full flex-col items-center justify-center py-10 sm:py-16">
        {/* Scale down for phones; full animated clamp size from md up */}
        <h1 className="text-[clamp(2.5rem,11vw,3rem)] font-medium leading-none text-bee-accent md:text-display-xl">
          Bee Concept
        </h1>

        <p className="mt-[clamp(1.25rem,4vh,2.5rem)] break-words text-body-lg font-medium text-white/80 max-w-[90%] mx-auto">
          Inspired Design. Intelligent Development. Impactful Marketing.
        </p>

        {/* Scroll-down chevron */}
        <button
          type="button"
          aria-label="Scroll to about"
          onClick={scrollToAbout}
          className="absolute bottom-[clamp(1.5rem,6vh,4rem)] left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center text-white/90 transition hover:text-bee-accent touch-target tap-highlight-transparent"
        >
          {/* Two stacked chevrons built from rotated borders */}
          <span className="relative h-7 w-7">
            <span className="absolute left-1 top-1 h-4 w-4 rotate-45 border-b-2 border-r-2 border-current" />
            <span className="absolute left-1 top-3 h-4 w-4 rotate-45 border-b-2 border-r-2 border-current" />
          </span>
        </button>
      </div>
    </section>
  );
}
