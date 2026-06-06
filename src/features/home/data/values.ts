/**
 * Values and statistics displayed on the home page.
 *
 * Values are the core principles the studio stands by, each with a
 * static and animated icon. Stats are numerical proof points shown
 * in the callout bar below the values grid.
 */

import { ASSETS } from "../../../shared/lib/assets";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ValueItem {
  /** Display title (rendered as heading) */
  title: string;
  /** Body text revealed on hover/active state */
  body: string;
  /** Static icon path */
  icon: string;
  /** Animated GIF icon path (replaces static on hover/touch) */
  animatedIcon: string;
  /** Tailwind colour class for the heading and icon tint */
  tone: "violet" | "red" | "green" | "cyan";
}

export interface StatItem {
  /** Formatted value string, e.g. "4+", "250+" */
  value: string;
  /** Descriptive label shown below the value */
  label: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const VALUES: readonly ValueItem[] = [
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

export const STATS: readonly StatItem[] = [
  { value: "4+", label: "years in Business" },
  { value: "250+", label: "Successful Projects" },
  { value: "100+", label: "Happy Clients" },
  { value: "600+", label: "Cups of coffee" },
] as const;