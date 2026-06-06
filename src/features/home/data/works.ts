/**
 * Portfolio work items displayed on the home page grid.
 *
 * Each work item maps to a project detail page and carries category
 * tags that determine which filter tabs it appears under.
 */

import { ASSETS } from "../../../shared/lib/assets";
import type { WorkCategory, WorkItem } from "../types/home";

// ── Category mapping ──────────────────────────────────────────────────────────

/**
 * Category assignments per work slug.
 * Edit this object to change which filters a project appears under.
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

// ── Data ──────────────────────────────────────────────────────────────────────

export const WORKS: readonly WorkItem[] = [
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