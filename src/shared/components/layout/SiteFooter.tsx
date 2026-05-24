import { Link, useLocation } from "react-router-dom";
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
  { label: "About Us", targetId: "about" },
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
  { label: "Services", to: "/service" },
];

// Contact details in one place — update here and it reflects everywhere.
const CONTACT = {
  phones:   ["6362260862", "9611746690"],
  email:    "hello@beeconcept.com",
  website:  "www.beeconcept.in",
  websiteHref: "https://www.beeconcept.in",
};

export function SiteFooter() {
  const location = useLocation();
  const isHome   = location.pathname === "/";

  function handleScrollTop() {
    if (isHome) {
      scrollToId("home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleContact() {
    if (isHome) {
      scrollToId("contact");
    } else {
      // Navigate to home and let ScrollToHash handle the rest
      window.location.assign("/#contact");
    }
  }

  return (
    <footer id="contact" className="bg-bee-bg-footer text-white">

      {/* ── Main body ── */}
      <div className="w-full px-section-x-sm pb-16 pt-20 sm:px-section-x-md lg:px-section-x-lg">

        {/* Back-to-top */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleScrollTop}
            className="flex items-center gap-4 text-base font-semibold transition hover:text-bee-accent"
          >
            I&apos;ve gone too far, send me back up
            <span className="relative grid h-10 w-10 place-items-center rounded-pill bg-bee-accent text-black" aria-hidden>
              <span className="h-3 w-3 border-r-2 border-t-2 border-current" />
              <span className="absolute h-4 w-0.5 rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* Four-column grid: CTA | Learn | Explore | Contact */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_0.6fr_0.6fr_1fr]">

          {/* CTA */}
          <div>
            <h2 className="max-w-[290px] text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-tight">
              Do you like <br /> what you see?
            </h2>
            <button
              type="button"
              onClick={handleContact}
              className="mt-6 rounded-pill bg-bee-accent px-8 py-3 text-sm font-medium text-black transition hover:bg-white"
            >
              Contact Us
            </button>
          </div>

          <FooterLinkColumn title="Learn" links={LEARN_LINKS} isHome={isHome} />
          <FooterLinkColumn title="Explore" links={EXPLORE_LINKS} isHome={isHome} />

          {/* Contact details */}
          <div>
            <h3 className="text-base font-extrabold text-bee-accent">Get In Touch</h3>
            <div className="mt-5 space-y-2 text-base text-white/90">
              <p>{CONTACT.phones.join(", ")}</p>
              <a href={`mailto:${CONTACT.email}`} className="block hover:text-bee-accent">
                {CONTACT.email}
              </a>
              <a href={CONTACT.websiteHref} target="_blank" rel="noreferrer" className="block hover:text-bee-accent">
                {CONTACT.website}
              </a>
            </div>
          </div>

        </div>

        {/* Decorative watermark */}
        <p className="mt-24 text-center text-watermark font-light leading-none text-white/[0.06]">
          Crafting since 2025
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.03] bg-bee-bg-deep">
        <div className="flex w-full flex-col gap-6 px-section-x-sm py-8 text-base text-white/25 sm:px-section-x-md md:flex-row md:items-center md:justify-between lg:px-section-x-lg">
          <img src={ASSETS.logoDark} alt="Bee Concept" className="h-11 w-auto" />
          <p>Copyright 2023 – 2026 &copy; All Rights Reserved. Design By Bee Concept</p>
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
      <h3 className="text-base font-extrabold text-bee-accent">{title}</h3>
      <ul className="mt-5 space-y-2 text-base text-white/25">
        {links.map((link) => {
          const className = "transition hover:text-bee-accent";

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
                    onClick={() => scrollToId(link.targetId)}
                    className={`${className} text-left`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link to={`/#${link.targetId}`} className={className}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          }

          return (
            <li key={link.label}>
              <span aria-disabled="true">{link.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
