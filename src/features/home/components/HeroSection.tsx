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
      className="relative grid min-h-[calc(100svh-76px)] place-items-center overflow-hidden bg-bee-bg-hero px-section-x-sm text-center text-white sm:px-section-x-md lg:px-section-x-lg"
    >
      <div className="flex min-h-[calc(100svh-76px)] w-full flex-col items-center justify-center py-10">
        <h1 className="text-display-xl font-extrabold leading-none text-bee-accent">
          Bee Concept
        </h1>

        <p className="mt-[clamp(1.25rem,4vh,2.5rem)] text-body-lg font-medium text-white/80">
          Inspired Design. Intelligent Development. Impactful Marketing.
        </p>

        {/* Scroll-down chevron */}
        <button
          type="button"
          aria-label="Scroll to about"
          onClick={scrollToAbout}
          className="absolute bottom-[clamp(1.5rem,6vh,4rem)] left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center text-white/90 transition hover:text-bee-accent"
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