import { ASSETS } from "../../../shared/lib/assets";

export type ServiceItem = {
  name: string;
  videoSrc: string;
  summary: string;
  /** Explicit line breaks reproduce the supplied service-row composition. */
  summaryLines?: string[];
  points: string[];
  layout: "left" | "right";
  contentClassName?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    name: "Branding",
    videoSrc: ASSETS.serviceBranding,
    summary: "Creating designs that align with your brand and captivate your audience.",
    summaryLines: ["Creating Designs That", "Align With Your Brand", "And Captivate Your", "Audience."],
    points: [
      "Brand Strategy",
      "Brand Design",
      "Brand Guidelines",
      "Brand Tone Of Voice",
      "Brand Implementation",
    ],
    layout: "left",
  },
  {
    name: "Digital Marketing",
    videoSrc: ASSETS.serviceDigitalMarketing,
    summary:
      "Innovative digital marketing solutions, redefining brand growth and setting new benchmarks in online success.",
    summaryLines: [
      "Innovative Digital Marketing",
      "Solutions, Redefining Brand",
      "Growth And Setting New",
      "Benchmarks In Online Success.",
    ],
    points: ["SEO", "SEM", "SMM", "Influencer Marketing", "Analytics & Data Tracking"],
    layout: "right",
    contentClassName: "mt-5 md:mt-8 lg:mt-10 xl:mt-14 lg:gap-20",
  },
  {
    name: "Ui/Ux",
    videoSrc: ASSETS.serviceUiUx,
    summary: "Creating designs that align with your brand and captivate your audience.",
    summaryLines: ["Creating Designs That", "Align With Your Brand", "And Captivate Your", "Audience."],
    points: ["Interface", "Wire Frame", "User Research"],
    layout: "left",
    contentClassName: "mt-5 md:mt-8 lg:mt-10 xl:mt-14 lg:gap-20",
  },
  {
    name: "Website",
    videoSrc: ASSETS.serviceWebsite,
    summary:
      "A website is a brand's gateway, instantly broadcasting powerful content to a global audience.",
    summaryLines: [
      "A Website Is A Brand's",
      "Gateway, Instantly",
      "Broadcasting Powerful",
      "Content To A Global",
      "Audience.",
    ],
    points: ["Web Design", "Responsive Web Design", "Wireframes"],
    layout: "right",
    contentClassName: "mb-10 md:mb-16 lg:mb-36 xl:mb-40 lg:gap-20",
  },
  {
    name: "3D",
    videoSrc: ASSETS.service3D,
    summary:
      "Innovative 3D solutions, redefining creativity and setting new benchmarks in interior, exterior, and product visualization.",
    summaryLines: [
      "Innovative 3D Solutions,",
      "Redefining Creativity And",
      "Setting New Benchmarks",
      "In Interior, Exterior, And",
      "Product Visualization.",
    ],
    points: ["Interior", "Exterior", "Product Props"],
    layout: "left",
  },
  {
    name: "Animation",
    videoSrc: ASSETS.serviceAnimation,
    summary: "Dynamic motion graphics, pushing boundaries and setting new industry standards.",
    summaryLines: ["Dynamic Motion", "Graphics, Pushing", "Boundaries And Setting", "New Industry Standards."],
    points: [
      "Promo",
      "Product Advertising",
      "Video Editing",
      "Informative Video",
      "Motion Graphics",
    ],
    layout: "right",
  },
];

export const processSteps: ProcessStep[] = [
  { title: "Discover", description: "We define goals, audience needs, and strategic direction." },
  {
    title: "Design",
    description: "We craft visual systems and interface language aligned to the brand.",
  },
  {
    title: "Develop",
    description: "We build responsive, production-ready experiences with performance in mind.",
  },
  { title: "Deliver", description: "We launch, validate, and optimize for measurable outcomes." },
];
