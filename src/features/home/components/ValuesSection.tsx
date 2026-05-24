import { useEffect, useRef, useState } from "react";
import { classNames } from "../../../shared/lib/classNames";
import { stats, values } from "../data/homeContent";

/*
 * Each value has a "tone" colour for its heading and icon.
 * These are defined here rather than in data so the CSS layer
 * stays separate from content — easier to update either independently.
 */
const TONE_CLASSES: Record<string, string> = {
  violet: "text-[#7a72ff]",
  red:    "text-[#ff3636]",
  green:  "text-[#39d77f]",
  cyan:   "text-[#18d7ff]",
};

export function ValuesSection() {
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function checkStatsVisibility() {
      const section = statsRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.82;
      const exitLine = window.innerHeight * 0.15;

      if (rect.top < triggerLine && rect.bottom > 0) {
        setStatsVisible(true);
      } else if (rect.bottom < exitLine || rect.top > window.innerHeight) {
        setStatsVisible(false);
      }
    }

    checkStatsVisibility();
    window.addEventListener("scroll", checkStatsVisibility, { passive: true });
    window.addEventListener("resize", checkStatsVisibility);

    return () => {
      window.removeEventListener("scroll", checkStatsVisibility);
      window.removeEventListener("resize", checkStatsVisibility);
    };
  }, []);

  return (
    <>
      {/* ── Values grid ── */}
      <section
        id="services"
        className="bg-bee-bg-primary px-section-x-sm py-20 text-white sm:px-section-x-md lg:px-section-x-lg"
      >
        {/* Section header */}
        <p className="text-label font-normal">
          <span aria-hidden>•</span> Our Values
        </p>
        <h2 className="mt-8 max-w-[930px] text-heading-sm font-semibold">
          We Bridge the Gap Between Tech &amp; Design Industries for Seamless Collaboration.
        </h2>

        {/*
         * Four-column staggered grid.
         * The stagger (even cards drop down) and hover-reveal are in home.css
         * under "4. VALUE CARDS".
         */}
        <div className="value-grid mt-16 grid grid-cols-4 gap-x-[clamp(1.25rem,3vw,3.25rem)] items-start">
          {values.map((value, index) => {
            const isActive = activeValue === value.title;

            return (
              <article
                key={value.title}
                tabIndex={0}
                className={classNames(
                  // Layout & visual base — Tailwind
                  "value-card w-full max-w-[300px] rounded-card bg-bee-bg-deep p-6",
                  // Tone colour for heading and icon
                  TONE_CLASSES[value.tone],
                )}
                onMouseEnter={() => setActiveValue(value.title)}
                onMouseLeave={() => setActiveValue(null)}
                onFocus={() => setActiveValue(value.title)}
                onBlur={() => setActiveValue(null)}
              >
                {/* Swap to animated icon when active */}
                <img
                  key={isActive ? "animated" : "static"}
                  src={isActive ? value.animatedIcon : value.icon}
                  alt=""
                  aria-hidden
                  className="value-card__icon h-[46px] w-[46px] object-contain"
                />

                <h3 className="mt-5 max-w-[220px] text-[1.4rem] font-medium leading-snug">
                  {value.title}
                </h3>

                {/* Body text — hidden by default, revealed by CSS hover */}
                <p className="value-card__body text-[0.78rem] leading-relaxed text-white">
                  {value.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section ref={statsRef} className="bg-bee-bg-deep px-section-x-sm py-12 text-white sm:px-section-x-md lg:px-section-x-lg">
        <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <AnimatedStatValue value={stat.value} active={statsVisible} />
              <p className="mt-2 text-[1.05rem] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function AnimatedStatValue({ value, active }: { value: string; active: boolean }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(String(target), "");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) {
      setCurrent(0);
      return;
    }

    let frameId = 0;
    const duration = 800;
    const start = performance.now();

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCurrent(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [active, target]);

  return (
    <p className="text-heading-lg font-extrabold leading-none">
      {current}
      {suffix}
    </p>
  );
}
