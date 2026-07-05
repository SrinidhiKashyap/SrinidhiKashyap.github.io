/** Central route contract used by routing, navigation, and feature links. */
export const ROUTES = {
  home: "/",
  service: "/service",
  contact: "/contact",
  workDetail: "/:slug",
} as const;

export type HomeSection =
  | "home"
  | "about"
  | "services"
  | "works"
  | "clients"
  | "testimonials"
  | "contact";

export function homeSectionHref(section: HomeSection): string {
  return `${ROUTES.home}#${section}`;
}

export function workDetailHref(slug: string): string {
  return `/${encodeURIComponent(slug)}`;
}
