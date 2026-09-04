import { ROUTES, type HomeSection } from "../app/routes";

/**
 * EDIT HERE: Website navigation and footer copy.
 * Keep `to` for full pages. Use `section` for sections on the home page.
 */
export interface NavigationItem {
  label: string;
  to?: string;
  section?: HomeSection;
}

export const PRIMARY_NAVIGATION: ReadonlyArray<NavigationItem> = [
  { label: "Home", section: "home" },
  { label: "About us", to: ROUTES.about },
  { label: "Work", section: "works" },
  { label: "Service", to: ROUTES.service },
  { label: "Contact", to: ROUTES.contact },
] as const;

export const FOOTER_CONTENT = {
  learn: [
    { label: "About Us", to: ROUTES.about },
    { label: "Company Values", section: "services" },
    { label: "Testimonials", section: "testimonials" },
  ],
  explore: [
    { label: "Home", section: "home" },
    { label: "Works", section: "works" },
    { label: "Clients", section: "clients" },
    { label: "Services", to: ROUTES.service },
  ],
  contact: {
    phones: ["6362260862", "9611746690"],
    email: "hello@beeconcept.com",
    website: "www.beeconcept.in",
    websiteHref: "https://www.beeconcept.in",
  },
} as const;
