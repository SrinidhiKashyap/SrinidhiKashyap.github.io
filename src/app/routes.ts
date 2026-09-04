/** Central route contract used by routing, navigation, and feature links. */
export const ROUTES = {
  home: "/",
  about: "/about",
  service: "/service",
  contact: "/contact",
  notFound: "/not-found",
  workDetail: "/:slug",
} as const;

export type HomeSection =
  "home" | "about" | "services" | "works" | "clients" | "testimonials" | "contact";

export function homeSectionHref(section: HomeSection): string {
  return `${ROUTES.home}#${section}`;
}

export function workDetailHref(slug: string): string {
  return `/${encodeURIComponent(slug)}`;
}
