/**
 * Service page types.
 *
 * Shared between `serviceContent.ts` and the service page components
 * (ServiceSection, ServicePointList, ServiceCard, etc.).
 */

export type ServiceItem = {
  name: string;
  videoSrc: string;
  summary: string;
  points: string[];
  layout: "left" | "right";
};

export type ProcessStep = {
  title: string;
  description: string;
};