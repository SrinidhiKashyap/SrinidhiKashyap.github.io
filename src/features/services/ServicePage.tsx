import { useCallback, useState } from "react";
import { PageLayout } from "../../shared/components/layout/PageLayout";
import { useServiceRevealProgress } from "./hooks/useServiceRevealProgress";
import { ServiceSection } from "./components/ServiceSection";
import { StudioWorkStrip } from "./components/StudioWorkStrip";
import { services } from "./data/serviceContent";
import "./service.css";

const MARQUEE_TEXT =
  "Our design and development team ensures a multidisciplinary, holistic research process.";

/**
 * ServicePage
 *
 * The main /service page. Displays a hero section, a scrolling marquee,
 * domain-specific service sections (Branding, UI/UX, Website, 3D, Animation,
 * Digital Marketing), and a "Latest From Our Studio" work strip.
 */
export function ServicePage() {
  const { progresses, sectionRefs } = useServiceRevealProgress();
  const [activePoints, setActivePoints] = useState<Set<string>>(() => new Set());

  const activatePoint = useCallback((pointKey: string) => {
    setActivePoints((current) => {
      const next = new Set(current);
      next.add(pointKey);
      return next;
    });
  }, []);

  return (
    <PageLayout>
      <main className="bg-bee-bg-primary text-white">
        <div className="w-full px-section-x-sm pb-8 pt-10 sm:px-section-x-md lg:px-section-x-lg">
          <p className="text-section-label">
            <span aria-hidden>&bull;</span> Service
          </p>
          <h1 className="mt-5 max-w-[650px] text-testimonial-heading font-semibold">
            An Advertising <br /> Agency Driven By <br /> Creative Expertise
          </h1>
        </div>

        <div className="service-marquee overflow-hidden py-12">
          <div className="service-marquee__track">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>{MARQUEE_TEXT}</span>
            ))}
          </div>
          <div className="service-marquee__track service-marquee__track--outline">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>

        <div className="w-full px-section-x-sm sm:px-section-x-md lg:px-section-x-lg">
          {services.map((service, index) => (
            <ServiceSection
              key={service.name}
              service={service}
              index={index}
              progress={progresses[index] ?? 0}
              setRef={(node) => {
                sectionRefs.current[index] = node;
              }}
              activePoints={activePoints}
              onActivatePoint={activatePoint}
            />
          ))}

          <StudioWorkStrip />
        </div>
      </main>
    </PageLayout>
  );
}