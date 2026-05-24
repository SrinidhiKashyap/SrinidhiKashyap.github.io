import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import type { ServiceItem } from "../data/serviceContent";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <AutoPlayVideo src={service.videoSrc} className="service-card-media" />
      <h2 className="text-4xl font-bold">{service.name}</h2>
      <p className="mt-4 text-white/70">
        Creating designs that align with your brand and captivate your audience.
      </p>
    </article>
  );
}
