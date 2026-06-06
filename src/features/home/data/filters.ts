/**
 * Work filter configuration for the portfolio grid.
 *
 * Controls which category tabs appear in the filter bar and the
 * display labels for each work category.
 */

import type { HomeWorkFilter, WorkCategory } from "../types/home";

// ── Filter tabs ───────────────────────────────────────────────────────────────

export const WORK_FILTERS: Array<{ label: string; value: HomeWorkFilter }> = [
  { label: "All Work", value: "All Work" },
  { label: "Branding", value: "Branding" },
  { label: "Packaging", value: "Package" },
  { label: "3D Design", value: "3D Renders" },
  { label: "Ui/Ux Design", value: "Ui/Ux" },
  { label: "Web Design", value: "Web Design" },
];

// ── Category labels ───────────────────────────────────────────────────────────

export const WORK_CATEGORY_LABELS: Record<WorkCategory, string> = {
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