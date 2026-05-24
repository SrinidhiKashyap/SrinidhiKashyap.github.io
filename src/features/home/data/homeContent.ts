import { ASSETS } from "../../../shared/lib/assets";
import type { HomeWorkFilter, NavLinkItem, TestimonialItem, WorkCategory, WorkItem } from "../types/home";

export const navLinks: NavLinkItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About Us", targetId: "about" },
  { label: "Works", targetId: "works" },
  { label: "Services", targetId: "services" },
  { label: "Contact", targetId: "contact" },
];

export const values = [
  {
    title: "Creativity With Purpose:",
    body: "We bring ideas to life, crafting innovative and meaningful narratives that resonate with your audience.",
    icon: ASSETS.iconCreativity,
    animatedIcon: ASSETS.gifCreativity,
    tone: "violet",
  },
  {
    title: "Client-Service Focused:",
    body: "Your vision is our mission. We partner with you to create strategies that elevate your brand.",
    icon: ASSETS.iconClientService,
    animatedIcon: ASSETS.gifClientService,
    tone: "red",
  },
  {
    title: "Commitment to Excellence:",
    body: "We strive for perfection in every project, ensuring top-notch quality and outstanding results.",
    icon: ASSETS.iconExcellence,
    animatedIcon: ASSETS.gifExcellence,
    tone: "green",
  },
  {
    title: "Integrity in Action:",
    body: "We uphold the highest ethical standards, fostering trust and transparency in all our relationships.",
    icon: ASSETS.iconIntegrity,
    animatedIcon: ASSETS.gifIntegrity,
    tone: "cyan",
  },
];

export const stats = [
  { value: "4+", label: "years in Business" },
  { value: "250+", label: "Successful Projects" },
  { value: "100+", label: "Happy Clients" },
  { value: "600+", label: "Cups of coffee" },
];

export const workFilters: Array<{ label: string; value: HomeWorkFilter }> = [
  { label: "All Work", value: "All Work" },
  { label: "Branding", value: "Branding" },
  { label: "Packaging", value: "Package" },
  { label: "3D Design", value: "3D Renders" },
  { label: "Ui/Ux Design", value: "Ui/Ux" },
  { label: "Web Design", value: "Web Design" },
];

export const workCategoryLabels: Record<WorkCategory, string> = {
  Branding: "Branding",
  Package: "Package",
  "3D Renders": "3D Renders",
  Animation: "Animation",
  "Ui/Ux": "Ui/Ux",
  "Web Design": "Web Design",
  Interface: "Interface",
  Magazines: "Magazines",
  "Cover Page": "Cover Page",
  Layout: "Layout",
  "Title Design": "Title Design",
};

/*
 * Work category mapping.
 *
 * Edit this object when a project should appear under different filters.
 * The visible tabs above remain unchanged; extra categories can live here now
 * and will start working later if a matching tab is added.
 */
const WORK_CATEGORIES: Record<string, WorkCategory[]> = {
  sterkros: ["Branding", "3D Renders", "Animation", "Package"],
  kalpa: ["Branding", "3D Renders", "Animation", "Package"],
  logoDesigns: ["Branding"],
  packageDesign: ["3D Renders", "Animation", "Package"],
  threeD: ["3D Renders", "Animation"],
  websiteDesign: ["Web Design", "Interface", "Ui/Ux"],
  uiUxProjects: ["Ui/Ux"],
  magazines: ["Magazines", "Cover Page", "Layout"],
  titleDesign: ["Title Design"],
};

export const works: WorkItem[] = [
  {
    id: "w1",
    categories: WORK_CATEGORIES.sterkros,
    title: "Sterkros",
    mediaType: "video",
    mediaUrl: ASSETS.workSterkros,
    year: "2023",
    caption: "Brand Identity",
    pagePath: "/sterkros",
  },
  {
    id: "w2",
    categories: WORK_CATEGORIES.kalpa,
    title: "Kalpa Organic",
    mediaType: "video",
    mediaUrl: ASSETS.workKalpa,
    year: "2023",
    caption: "Label & Box System",
    pagePath: "/kalpa",
  },
  {
    id: "w3",
    categories: WORK_CATEGORIES.threeD,
    title: "3D Renders",
    mediaType: "video",
    mediaUrl: ASSETS.work3D,
    year: "2023",
    caption: "3D Product Visuals",
    pagePath: "/website",
  },
  {
    id: "w4",
    categories: WORK_CATEGORIES.uiUxProjects,
    title: "UI / UX",
    mediaType: "video",
    mediaUrl: ASSETS.workUiUx,
    year: "2023",
    caption: "UI/UX Projects",
    pagePath: "/uiux",
  },
  {
    id: "w5",
    categories: WORK_CATEGORIES.websiteDesign,
    title: "Web Design",
    mediaType: "video",
    mediaUrl: ASSETS.workWebsite,
    year: "2023",
    caption: "Website Design",
    pagePath: "/magazine",
  },
  {
    id: "w6",
    categories: WORK_CATEGORIES.packageDesign,
    title: "Package Design",
    mediaType: "video",
    mediaUrl: ASSETS.workPackage,
    year: "2023",
    caption: "Packaging Design",
    pagePath: "/package",
  },
  {
    id: "w7",
    categories: WORK_CATEGORIES.magazines,
    title: "Magazines",
    mediaType: "video",
    mediaUrl: ASSETS.workMagazines,
    year: "2023",
    caption: "Magazine Layouts",
    pagePath: "/team",
  },
  {
    id: "w8",
    categories: WORK_CATEGORIES.logoDesigns,
    title: "Logo Designs",
    mediaType: "video",
    mediaUrl: ASSETS.workLogoDesigns,
    year: "2023",
    caption: "Logo Design",
    pagePath: "/about",
  },
  {
    id: "w9",
    categories: WORK_CATEGORIES.titleDesign,
    title: "Title Design",
    mediaType: "video",
    mediaUrl: ASSETS.workTitleDesign,
    year: "2023",
    caption: "Title Design",
    pagePath: "/sterkros",
  },
];

export const marqueeLogos = [
  ASSETS.brand1,
  ASSETS.brand2,
  ASSETS.brand3,
  ASSETS.brand4,
  ASSETS.brand5,
  ASSETS.brand6,
  ASSETS.brand7,
  ASSETS.brand8,
];

export const testimonials: TestimonialItem[] = [
  {
    id: "shridhar",
    name: "ಶ್ರೀಧರ್ ಬನಾವಾಸಿ ಬಿ.ಸಿ",
    role: "ಮುಖ್ಯಸ್ಥರು, ಪಂಚಮಿ ಮೀಡಿಯಾ ಪಬ್ಲಿಕೇಷನ್ಸ್",
    quote:
      "ಬೀ ಕಾನ್ಸೆಪ್ಟ್, ನಮ್ಮ ಕಲ್ಪನೆಗೆ ರೂಪ ಕೊಡುವ ವಿಷಯ ಬಂದರೆ, ನಮ್ಮ ಅವಶ್ಯಕತೆ, ಸೃಜನಶೀಲತೆಗೆ ಅನುಗುಣವಾಗಿ ಉತ್ತಮ ಸೇವೆಯನ್ನು ನೀಡುತ್ತಿದ್ದಾರೆ. ಅವರ ಕ್ರಿಯಾಶೀಲತೆ, ಬದ್ಧತೆಯ ಗುಣಗಳು ನನಗೆ ತುಂಬಾ ಇಷ್ಟವಾಗಿವೆ. ಈ ತಂಡದ ಜೊತೆ ನಮ್ಮ ಸಂಸ್ಥೆಯು ಸದಾ ಕೆಲಸ ಮಾಡಲಿದೆ.",
    avatar: ASSETS.contactPhoto,
  },
  {
    id: "prakesh",
    name: "Prakash S Mudulkar",
    role: "CEO of STERKROS",
    quote:
      "Thanks for the impressive Sterkros logo design! It perfectly captures our brand essence with elegance and simplicity. The choice of colors is brilliant, and the scalability and versatility are outstanding. Thanks for your hard work and creating a logo that stands out and resonates with our brand. Looking forward to more collaborations in the future!",
    avatar: "/assets/home1-DuxIdUgA.png",
  },
  {
    id: "sunil",
    name: "Sunil D",
    role: "Founder of Om Enterprise",
    quote:
      "(Rain Water Harvesting System) Well-known trustworthy Advertising agency, More Reliable & Well Service Provider, I Suggest Bee concept For website creation and logo Designs.",
    avatar: "/assets/t2-iUX6M5gu.jpg",
  },
];
