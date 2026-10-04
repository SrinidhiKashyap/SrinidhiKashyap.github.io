import { riceAssets as RICE, riceContent } from "../data/riceDetail";
import { DetailImage, DetailVideoProvider, NextWorkStrip, WorkDetailHero } from "./";

const GALLERY_IMAGES = [
  { src: RICE.front, alt: "Floating front view of the Ratna rice package", className: "md:col-span-3" },
  { src: RICE.back, alt: "Floating back view of the Ratna rice package", className: "md:col-span-2" },
  { src: RICE.downOne, alt: "Ratna rice packages arranged flat", className: "md:col-span-2" },
  { src: RICE.twoProps, alt: "Front and back views of the Ratna rice package", className: "md:col-span-3" },
] as const;

export function RiceDetailPage() {
  return (
    <DetailVideoProvider>
      <main className="bg-bee-bg-primary text-white">
        <WorkDetailHero
          videoSrc={RICE.glimpseVideo}
          poster={RICE.front}
          title={riceContent.title}
          description={<p>{riceContent.intro}</p>}
          scope={riceContent.scope}
          muteToggle
        />

        <section className="px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg lg:py-14">
          <div className="mx-auto w-[90%]">
            <div className="md:flex md:items-start md:justify-between">
              {GALLERY_IMAGES.slice(0, 2).map((image) => (
                <div key={image.src} className={`pt-6 md:pt-0 ${image.className === "md:col-span-3" ? "md:w-[60%] md:pr-2" : "md:w-[40%] md:pl-2"}`}>
                  <DetailImage
                    src={image.src}
                    alt={image.alt}
                    className="h-[30vh] w-full object-cover sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[80vh]"
                  />
                </div>
              ))}
            </div>
            <div className="md:flex md:items-start md:justify-between md:py-10">
              {GALLERY_IMAGES.slice(2).map((image) => (
                <div key={image.src} className={`py-6 md:py-0 ${image.className === "md:col-span-2" ? "md:w-[40%] md:pr-2" : "md:w-[60%] md:pl-2"}`}>
                  <DetailImage
                    src={image.src}
                    alt={image.alt}
                    className="h-[30vh] w-full object-cover sm:h-[40vh] md:h-[500px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <NextWorkStrip workIds={["w1", "w2"]} />
      </main>
    </DetailVideoProvider>
  );
}
