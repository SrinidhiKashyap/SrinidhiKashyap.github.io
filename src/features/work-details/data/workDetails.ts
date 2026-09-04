import { validateDetailPageData } from "./workDetails.schema";
import type { DetailPageData } from "./workDetails.schema";

const RAW_WORK_DETAILS: Record<string, unknown> = {
  "logo-design": {
    title: "Logo Design",
    summary: "Distinctive logo systems and motion identities built for lasting brand recognition.",
    scope: ["Logo Design", "Brand Identity", "Logo Animation"],
    hero: "/assets/logo-white.png",
    showcaseVideo: "/assets/work-logo-detail/logos-glimpse.mp4",
    gallery: [],
    deliverables: "Ten custom logo identities with animated brand reveals.",
    challenge: "Each identity needed a unique, memorable visual voice.",
    outcome: "A diverse collection of flexible and recognizable brand marks.",
  },
  "title-design": {
    title: "Title Design",
    summary: "Expressive typographic identities created for cinematic and entertainment titles.",
    scope: ["Title Design", "Typography", "Art Direction"],
    hero: "/assets/work-title-design-detail/karna.webp",
    showcaseVideo: "/assets/work-titledesign-homepage.mp4",
    gallery: [
      "/assets/work-title-design-detail/gani.webp",
      "/assets/work-title-design-detail/jatayu.webp",
    ],
    deliverables:
      "A collection of distinctive title treatments designed for impact across posters, screens, and campaign artwork.",
    challenge: "Each title needed its own voice while remaining immediately legible and memorable.",
    outcome:
      "The resulting identities give every property a recognizable visual signature with strong promotional flexibility.",
  },
  sterkros: {
    title: "Sterkros Fitness company",
    summary:
      "Bee concept crafted a sophisticated identity and packaging system for Sterkros, strengthening product visibility and fitness-first messaging.",
    scope: [
      "Brand Identity & Guideline",
      "3D Renders",
      "Brand Collaterals",
      "Motion Graphics",
      "Packaging",
    ],
    hero: "/assets/work-sterkros-detail/logo-sign.png",
    showcaseVideo: "/assets/work-sterkros-detail/glimpse.mp4",
    gallery: [
      "/assets/work-sterkros-detail/gym-bag.webp",
      "/assets/work-sterkros-detail/apple-watch.webp",
    ],
    deliverables:
      "The final rollout included packaging hierarchy, visual language guidelines, launch collaterals, and social-ready motion assets aligned to a single bold tone.",
    challenge:
      "The brand had to communicate fitness credibility while staying premium on crowded shelves and social channels.",
    outcome:
      "Sterkros launched with a unified visual ecosystem that improved product clarity and amplified campaign recall.",
  },
  kalpa: {
    title: "Kalpa Organic",
    summary:
      "A refreshed visual system and packaging direction that balances clean design with strong shelf presence for Kalpa.",
    scope: ["Branding", "Packaging", "Label System", "Product Visualization"],
    hero: "/assets/work-kalpa-detail/main-poster.webp",
    showcaseVideo: "/assets/work-kalpa-detail/glimpse.mp4",
    gallery: [
      "/assets/work-kalpa-detail/flying-bottle.webp",
      "/assets/work-kalpa-detail/three-bottles.webp",
    ],
    deliverables:
      "We shaped a product-first packaging structure with stronger variant clarity, visual consistency across formats, and a refined organic premium look.",
    challenge:
      "Kalpa needed a natural yet modern packaging system that could scale across multiple SKUs without losing recognizability.",
    outcome:
      "The new design language delivered stronger shelf differentiation and easier expansion for future product variants.",
  },
  uiux: {
    title: "UI/UX Case Collection",
    summary:
      "Interaction-focused product experiences with practical user journeys and clear visual hierarchy.",
    scope: ["UX Research", "Wireframing", "Interface Design", "Prototype Flows"],
    hero: "/assets/work-uiux-detail/forest-mockup.webp",
    showcaseVideo: "/assets/work-uiux-detail/glimpse.mp4",
    gallery: [
      "/assets/work-uiux-detail/red-mockup.webp",
      "/assets/work-uiux-detail/logo-mockup.webp",
    ],
    deliverables:
      "Each case delivered user flows, interactive wireframes, visual systems, and responsive UI components designed to reduce friction at every key touchpoint.",
    challenge:
      "Products had inconsistent user journeys and unclear interface priorities, causing drop-offs during critical actions.",
    outcome:
      "We simplified interaction flows and introduced clear visual hierarchy, resulting in better usability and engagement.",
  },
  website: {
    title: "Website Design",
    summary: "A modern online meat shop experience for MeatMart.",
    scope: ["Website Design", "UI/UX Design", "Development"],
    hero: "/assets/work-website-detail/website-mockup.webp",
    showcaseVideo: "/assets/work-website-detail/meat-shop-glimpse.mp4",
    gallery: [
      "/assets/work-website-detail/meat-shop-page-top.webp",
      "/assets/work-website-detail/meat-shop-page-bottom.webp",
    ],
    deliverables:
      "The website package covered page architecture, conversion-led sections, motion references, and implementation-ready component layouts for development.",
    challenge:
      "The website had to balance storytelling, fast loading, and conversion-focused information hierarchy across devices.",
    outcome:
      "The final experience improved readability, strengthened brand narrative, and created a clear conversion journey.",
  },
  magazine: {
    title: "Magazine Cover Page Layout",
    summary:
      "Editorial composition and cover systems that blend impact typography with brand consistency.",
    scope: ["Editorial Layout", "Art Direction", "Typography", "Print-ready Design"],
    hero: "/assets/work-magazine-detail/frame-01.webp",
    showcaseVideo: "/assets/work-magazines-homepage.mp4",
    gallery: [
      "/assets/work-magazine-detail/frame-02.webp",
      "/assets/work-magazine-detail/frame-03.webp",
    ],
    deliverables:
      "The final editorial set included multiple cover explorations, print-safe color tuning, and layout templates to maintain consistency across issues.",
    challenge:
      "Editorial covers needed to look distinctive issue-by-issue while preserving a recognizable publication identity.",
    outcome:
      "We delivered a reusable cover system with strong typographic impact and consistent art direction.",
  },
  package: {
    title: "Package Design",
    summary: "Ratna premium jeera rice package design.",
    scope: ["Book Layouts", "Magazine Layouts", "Cover Design"],
    hero: "/assets/work-rice-detail/hero.webp",
    showcaseVideo: "/assets/work-rice-detail/Rice packaging glimpse vid 02.mp4",
    gallery: [
      "/assets/work-rice-detail/front-float.webp",
      "/assets/work-rice-detail/back-float.webp",
    ],
    deliverables:
      "This collection included dieline-aware design systems, 3D pack previews, and production notes to ensure the concept translated cleanly to manufacturing.",
    challenge:
      "Different product categories required one coherent packaging family with clear differentiation between variants.",
    outcome:
      "The packaging architecture improved scan-ability, preserved brand consistency, and simplified production handoff.",
  },
  about: {
    title: "About The Studio",
    summary: "A closer look at Bee concept's culture, values, and collaborative process.",
    scope: ["Culture", "Values", "Capabilities", "Collaboration Process"],
    hero: "/assets/about/studio.jpg",
    showcaseVideo: "/assets/work-websitedesign-homepage.mp4",
    gallery: ["/assets/about/team.jpg", "/assets/home1-DuxIdUgA.png"],
    deliverables:
      "Our studio process blends design and development from day one, keeping strategy, content, and production aligned so brands scale with consistency.",
    challenge:
      "We needed to communicate both creative craft and operational clarity in a way clients immediately understand.",
    outcome:
      "The studio narrative now clearly presents process, expertise, and collaboration model from discovery to rollout.",
  },
  team: {
    title: "Our Team",
    summary:
      "A multidisciplinary team bridging design craft and technical execution for brand growth.",
    scope: ["Design Team", "Development Team", "3D Team", "Motion Team"],
    hero: "/assets/home1-DuxIdUgA.png",
    showcaseVideo: "/assets/work-uiuxprojects-homepage.mp4",
    gallery: ["/assets/about/team.jpg", "/assets/home1-DuxIdUgA.png"],
    deliverables:
      "Our team structure keeps research, design, and execution connected through rapid collaboration cycles, reducing rework and improving launch quality.",
    challenge:
      "Project speed and quality required tighter cross-functional coordination across creative and technical tracks.",
    outcome:
      "A collaborative production rhythm now allows rapid iteration while maintaining high design and delivery standards.",
  },
};

/**
 * Validated work detail records.
 * Each entry is checked against the Zod schema at module load time.
 * If validation fails, the app will not start — preventing silent data corruption.
 */
export const workDetails: Record<string, DetailPageData> = Object.fromEntries(
  Object.entries(RAW_WORK_DETAILS).map(([slug, data]) => [
    slug,
    validateDetailPageData(slug, data),
  ]),
);
