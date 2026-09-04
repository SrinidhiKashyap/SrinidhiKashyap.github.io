import { ASSETS } from "../../../shared/lib/assets";

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

export const services: ServiceItem[] = [
  {
    name: "Branding",
    videoSrc: ASSETS.serviceBranding,
    summary: "Creating designs that align with your brand and captivate your audience.",
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
    points: ["SEO", "SEM", "SMM", "Influencer Marketing", "Analytics & Data Tracking"],
    layout: "right",
  },
  {
    name: "Ui/Ux",
    videoSrc: ASSETS.serviceUiUx,
    summary: "Creating designs that align with your brand and captivate your audience.",
    points: ["Interface", "Wire Frame", "User Research"],
    layout: "left",
  },
  {
    name: "Website",
    videoSrc: ASSETS.serviceWebsite,
    summary:
      "A website is a brand's gateway, instantly broadcasting powerful content to a global audience.",
    points: ["Web Design", "Responsive Web Design", "Wireframes"],
    layout: "right",
  },
  {
    name: "3D",
    videoSrc: ASSETS.service3D,
    summary:
      "Innovative 3D solutions, redefining creativity and setting new benchmarks in interior, exterior, and product visualization.",
    points: ["Interior", "Exterior", "Product Props"],
    layout: "left",
  },
  {
    name: "Animation",
    videoSrc: ASSETS.serviceAnimation,
    summary: "Dynamic motion graphics, pushing boundaries and setting new industry standards.",
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
