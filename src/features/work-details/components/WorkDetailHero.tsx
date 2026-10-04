import type { ReactNode } from "react";
import { DetailVideo } from "./DetailVideo";

interface WorkDetailHeroProps {
  videoSrc: string;
  title: ReactNode;
  description: ReactNode;
  scope?: readonly string[];
  poster?: string;
  videoClassName?: string;
  fit?: "cover" | "contain";
  muteToggle?: boolean;
}

/** Shared video, title, and description layout for portfolio detail pages. */
export function WorkDetailHero({
  videoSrc,
  title,
  description,
  scope,
  poster,
  videoClassName = "",
  fit = "cover",
  muteToggle = false,
}: WorkDetailHeroProps) {
  return (
    <section className="flex flex-col items-stretch px-6 py-4 md:flex-row md:px-0 md:py-14">
      <div className="flex w-full md:w-[54%]">
        <DetailVideo
          src={videoSrc}
          poster={poster}
          className={`mb-6 aspect-video h-full w-full md:mb-0 ${videoClassName}`}
          fit={fit}
          priority
          muteToggle={muteToggle}
        />
      </div>
      <div className="flex w-full flex-col justify-center text-white md:w-[46%] md:px-16 lg:px-20 xl:pl-28">
        <h1 className="text-3xl font-medium leading-[1.35] md:text-4xl lg:text-5xl xl:text-[55px]">
          {title}
        </h1>
        <div className="space-y-4 pt-6 text-sm font-normal text-white/85 md:text-base lg:text-lg xl:text-xl">
          {description}
        </div>
        {scope && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold md:text-base lg:text-lg xl:text-xl">
              Bee concept<sup>®</sup> Scope of Work:
            </p>
            <ul className="mt-2 list-none space-y-1 text-sm font-normal md:text-base lg:text-lg">
              {scope.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
