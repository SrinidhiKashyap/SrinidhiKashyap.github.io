import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ASSETS } from "../../lib/assets";
import { classNames } from "../../lib/classNames";
import { scrollToId } from "../../lib/scrollToId";
import { useNavScroll } from "../../hooks/useNavScroll";

// ─── Nav link config ──────────────────────────────────────────────────────────
// To add a nav item, edit this array only.
// - Use `targetId` for home-page sections (smooth-scrolls when on "/", links
//   to "/#id" when on any other page so the browser still lands in the right spot)
// - Use `to` for standalone routes
const NAV_LINKS = [
  { label: "Home",     targetId: "home"    },
  { label: "About us", targetId: "about"   },
  { label: "Work",     targetId: "works"   },
  { label: "Service",  to: "/service"      },
  { label: "Contact",  targetId: "contact" },
] as const;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isHome: boolean;
};

function MobileMenu({ open, onClose, isHome }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="border-t border-white/10 bg-bee-bg-footer md:hidden">
      <div className="flex flex-col px-6 py-4">
        {NAV_LINKS.map((link) => {
          if ("to" in link) {
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={onClose}
                className="py-3 text-sm font-medium text-white/75 transition hover:text-white"
              >
                {link.label}
              </Link>
            );
          }

          // On home: smooth scroll. On other pages: navigate to hash URL.
          return isHome ? (
            <button
              key={link.label}
              type="button"
              onClick={() => { onClose(); scrollToId(link.targetId); }}
              className="py-3 text-left text-sm font-medium text-white/75 transition hover:text-white"
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              to={`/#${link.targetId}`}
              onClick={onClose}
              className="py-3 text-sm font-medium text-white/75 transition hover:text-white"
            >
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => { onClose(); isHome ? scrollToId("contact") : window.location.assign("/contact"); }}
          className="mt-2 rounded-pill bg-bee-accent px-4 py-2 text-sm font-semibold text-black"
        >
          Chat with Us
        </button>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const location  = useLocation();
  const isHome    = location.pathname === "/";
  const { visible, menuOpen, setMenuOpen } = useNavScroll();

  function handleLogoClick() {
    if (isHome) scrollToId("home");
  }

  return (
    <header
      className={classNames(
        "fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-bee-bg-footer/95 text-white backdrop-blur-md",
        "transition-transform duration-300 ease-in-out",
        // On inner pages the nav is always visible; on home it hides on scroll-down
        !isHome || visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      {/* ── Main bar ── */}
      <div className="flex h-[76px] items-center justify-between px-section-x-sm sm:px-12 xl:px-section-x-lg">

        {/* Logo — scrolls to top on home, navigates home from other pages */}
        {isHome ? (
          <button type="button" aria-label="Bee Concept home" onClick={handleLogoClick}>
            <img src={ASSETS.logoDark} alt="Bee Concept" className="h-12 w-auto" />
          </button>
        ) : (
          <Link to="/" aria-label="Bee Concept home">
            <img src={ASSETS.logoDark} alt="Bee Concept" className="h-12 w-auto" />
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-16 md:flex">
          {NAV_LINKS.map((link) => {
            if ("to" in link) {
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-nav-link font-normal text-white/90 transition hover:text-bee-accent"
                >
                  {link.label}
                </Link>
              );
            }

            return isHome ? (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollToId(link.targetId)}
                className="text-nav-link font-normal text-white/90 transition hover:text-bee-accent"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={`/#${link.targetId}`}
                className="text-nav-link font-normal text-white/90 transition hover:text-bee-accent"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden"
        >
          <div className="relative h-8 w-10">
            <div className="absolute left-2 right-2 top-3 h-[2px] bg-white/80" />
            <div className="absolute left-2 right-2 top-5 h-[2px] bg-white/80" />
            <div className="absolute left-2 right-2 top-7 h-[2px] bg-white/80" />
          </div>
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isHome={isHome}
      />
    </header>
  );
}
