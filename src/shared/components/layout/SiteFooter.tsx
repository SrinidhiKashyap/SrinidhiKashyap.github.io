import { Link, useLocation } from "react-router-dom";
import { ROUTES, homeSectionHref, type HomeSection } from "../../../app/routes";
import { ASSETS } from "../../lib/assets";
import { scrollToId } from "../../lib/scrollToId";

// ─── Footer content config ────────────────────────────────────────────────────
// Edit these arrays to add/remove footer links. No JSX changes needed.

type FooterLinkItem = {
  label: string;
  targetId?: string;
  to?: string;
};

const LEARN_LINKS: FooterLinkItem[] = [
  { label: "About Us", to: ROUTES.about },
  { label: "Our Culture" },
  { label: "Our Team" },
  { label: "Company Values", targetId: "services" },
  { label: "FAQ'S" },
  { label: "Testimonials", targetId: "testimonials" },
];

const EXPLORE_LINKS: FooterLinkItem[] = [
  { label: "Home", targetId: "home" },
  { label: "Works", targetId: "works" },
  { label: "Clients", targetId: "clients" },
  { label: "Services", to: ROUTES.service },
];

// Contact details in one place — update here and it reflects everywhere.
const CONTACT = {
  phones: ["6362260862", "9611746690"],
  email: "hellobeeconcept@gmail.com",
  website: "www.beeconcept.in",
  websiteHref: "https://www.beeconcept.in",
};

export function SiteFooter() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;

  function handleScrollTop() {
    if (isHome) {
      scrollToId("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer id="contact" className="bg-bee-bg-footer text-white">
      {/* ── Main body ── */}
      <div className="w-full px-section-x-sm pb-12 pt-12 sm:px-section-x-md lg:px-section-x-lg">
        {/* Back-to-top */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleScrollTop}
            className="group flex items-center gap-4 text-base font-medium transition hover:text-bee-accent touch-target tap-highlight-transparent md:text-xl"
          >
            <span className="hidden sm:inline">I've gone too far, send me back up</span>
            <span className="sm:hidden">Back to top</span>
            <span
              className="relative grid h-12 w-12 place-items-center rounded-pill bg-bee-accent text-black transition-transform group-hover:-translate-y-1"
              aria-hidden
            >
              <span className="h-4 w-4 border-r-2 border-t-2 border-current" />
              <span className="absolute h-5 w-0.5 rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* Responsive grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-2 md:flex md:justify-between">
          {/* CTA */}
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-base font-medium leading-tight sm:text-lg md:text-3xl lg:text-5xl">
              Do you like <br /> what you see?
            </h2>
            <a
              href="https://wa.me/6362260862"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-pill bg-bee-accent px-2 py-1 text-[10px] font-medium text-black transition duration-250 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft touch-target tap-highlight-transparent md:mt-4 md:px-5 md:py-2 md:text-sm lg:mt-6 lg:px-8 lg:py-3 lg:text-base"
            >
              Chat with Us
            </a>
          </div>

          <FooterLinkColumn title="Learn" links={LEARN_LINKS} isHome={isHome} />
          <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} isHome={isHome} />

          {/* Contact details */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-base font-medium text-bee-accent md:text-lg lg:text-xl">Get In Touch</h3>
            <div className="mt-4 space-y-1 text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
              <p>{CONTACT.phones.join(", ")}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="block transition hover:text-bee-accent tap-highlight-transparent"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="block text-bee-accent underline transition hover:text-white tap-highlight-transparent"
              >
                {CONTACT.website}
              </a>
            </div>
          </div>
        </div>

        {/* Decorative watermark - smaller on mobile */}
        <p className="mb-8 mt-16 text-center text-4xl md:text-6xl lg:text-watermark font-normal leading-none text-white/[0.06]">
          Crafting since 2025
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.03] bg-bee-bg-deep">
        <div className="relative flex w-full flex-col gap-4 px-section-x-sm py-6 text-sm text-white/25 sm:px-section-x-md md:flex-row md:items-center md:justify-between lg:px-section-x-lg">
          <img src={ASSETS.logoDark} alt="Bee Concept" className="h-11 w-auto md:h-14" />
          <p className="text-center text-lg md:absolute md:left-1/2 md:-translate-x-1/2 md:whitespace-nowrap md:text-xl">
            Copyright 2025 &copy; All Rights Reserved. Design By Bee Concept
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function FooterLinkColumn({
  title,
  links,
  isHome,
}: {
  title: string;
  links: FooterLinkItem[];
  isHome: boolean;
}) {
  return (
    <div>
      <h3 className="text-base font-medium text-bee-accent md:text-lg lg:text-xl">{title}</h3>
      <ul className="mt-4 space-y-0.5 text-sm leading-normal text-white/25 sm:text-base md:text-lg lg:text-xl">
        {links.map((link) => {
          const className =
            "inline-block transition hover:translate-x-1 hover:text-bee-accent tap-highlight-transparent";

          if (link.to) {
            return (
              <li key={link.label}>
                <Link to={link.to} className={className}>
                  {link.label}
                </Link>
              </li>
            );
          }

          if (link.targetId) {
            return (
              <li key={link.label}>
                {isHome ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (link.targetId) scrollToId(link.targetId);
                    }}
                    className={`${className} text-left`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link to={homeSectionHref(link.targetId as HomeSection)} className={className}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          }

          return (
            <li key={link.label}>
              <span
                aria-disabled="true"
                className="inline-block transition hover:translate-x-1 hover:text-bee-accent"
              >
                {link.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
