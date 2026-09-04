import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES, homeSectionHref } from "../../../app/routes";
import { ASSETS } from "../../lib/assets";
import { classNames } from "../../lib/classNames";
import { scrollToId } from "../../lib/scrollToId";
import { useNavScroll } from "../../hooks/useNavScroll";
import { PRIMARY_NAVIGATION } from "../../../content/navigation";

// ─── Nav link config ──────────────────────────────────────────────────────────
// To add a nav item, edit this array only.
// - Use `targetId` for home-page sections (smooth-scrolls when on "/", links
//   to "/#id" when on any other page so the browser still lands in the right spot)
// - Use `to` for standalone routes
const NAV_LINKS = PRIMARY_NAVIGATION;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isHome: boolean;
};

function MobileMenu({ open, onClose, isHome }: MobileMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setIsAnimating(true);
      // Small delay to allow the element to mount before animation starts
      const timer = setTimeout(() => setIsAnimating(false), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open && !isAnimating) return null;

  return (
    <div
      className={classNames(
        "border-t border-white/10 bg-bee-bg-footer md:hidden overflow-hidden transition-all duration-300 ease-out",
        isAnimating ? "max-h-0 opacity-0" : "max-h-96 opacity-100",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex flex-col px-6 py-4">
        {NAV_LINKS.map((link) => {
          if (link.to) {
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={onClose}
                className="py-4 text-base font-medium text-white/75 transition hover:text-white touch-target"
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
              onClick={() => {
                onClose();
                scrollToId(link.section!);
              }}
              className="py-4 text-left text-base font-medium text-white/75 transition hover:text-white touch-target"
            >
              {link.label}
            </button>
          ) : (
            <Link
              key={link.label}
              to={homeSectionHref(link.section!)}
              onClick={onClose}
              className="py-4 text-base font-medium text-white/75 transition hover:text-white touch-target"
            >
              {link.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => {
            onClose();
            if (isHome) scrollToId("contact");
            else navigate(ROUTES.contact);
          }}
          className="mt-4 rounded-pill bg-bee-accent px-6 py-3 text-base font-semibold text-black touch-target"
        >
          Chat with Us
        </button>
      </div>
    </div>
  );
}

export function SiteNavbar() {
  const location = useLocation();
  const isHome = location.pathname === ROUTES.home;
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
          <button
            type="button"
            aria-label="Bee Concept home"
            onClick={handleLogoClick}
            className="touch-target"
          >
            <img src={ASSETS.logoDark} alt="Bee Concept" className="h-12 w-auto sm:h-10" />
          </button>
        ) : (
          <Link to={ROUTES.home} aria-label="Bee Concept home" className="touch-target">
            <img src={ASSETS.logoDark} alt="Bee Concept" className="h-12 w-auto sm:h-10" />
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-16 md:flex">
          {NAV_LINKS.map((link) => {
            if (link.to) {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
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
                onClick={() => scrollToId(link.section!)}
                className="text-nav-link font-normal text-white/90 transition hover:text-bee-accent"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={homeSectionHref(link.section!)}
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
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden touch-target p-2"
        >
          <div className="relative h-6 w-8">
            <span
              className={classNames(
                "absolute left-1 right-1 top-2 h-[2px] bg-white/80 transition-all duration-300",
                menuOpen && "top-3 rotate-45",
              )}
            />
            <span
              className={classNames(
                "absolute left-1 right-1 top-4 h-[2px] bg-white/80 transition-all duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={classNames(
                "absolute left-1 right-1 top-6 h-[2px] bg-white/80 transition-all duration-300",
                menuOpen && "top-3 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isHome={isHome} />
    </header>
  );
}
