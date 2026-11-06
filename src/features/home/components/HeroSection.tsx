/**
 * HeroSection
 *
 * Full-viewport homepage video with a scroll-down chevron button that
 * scrolls to #about.
 */
export function HeroSection() {
  function scrollToAbout() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-bee-bg-hero text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/home-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        aria-label="Bee Concept showreel"
      />

      <button
        type="button"
        aria-label="Scroll to about"
        onClick={scrollToAbout}
        className="absolute bottom-[clamp(1.5rem,6vh,4rem)] left-1/2 z-10 grid h-14 w-14 -translate-x-1/2 place-items-center text-white/90 transition hover:text-bee-accent touch-target tap-highlight-transparent"
      >
        <span className="relative h-7 w-7">
          <span className="absolute left-1 top-1 h-4 w-4 rotate-45 border-b-2 border-r-2 border-current" />
          <span className="absolute left-1 top-3 h-4 w-4 rotate-45 border-b-2 border-r-2 border-current" />
        </span>
      </button>
    </section>
  );
}
