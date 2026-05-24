import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import type { DetailPageData } from "../types/work";

type WorkShowcaseProps = {
  work: DetailPageData;
};

export function WorkShowcase({ work }: WorkShowcaseProps) {
  return (
    <section className="work-detail-section pb-12">
      <div className="work-detail-showcase-wrap">
        <AutoPlayVideo src={work.showcaseVideo} className="h-[300px] w-full object-cover md:h-[430px]" />
      </div>
    </section>
  );
}
