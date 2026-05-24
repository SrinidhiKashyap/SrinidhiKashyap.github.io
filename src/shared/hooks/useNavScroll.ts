import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * useNavScroll
 *
 * Tracks scroll direction to show/hide the navbar, and owns the mobile
 * menu open/close state so SiteNavbar doesn't need its own useState.
 *
 * Returns:
 *   visible   — false when the user scrolls down (navbar slides up)
 *   menuOpen  — whether the mobile menu is open
 *   setMenuOpen — toggle function passed to the hamburger button
 */
export function useNavScroll() {
  const location = useLocation();
  const [visible,   setVisible]   = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [lastY,     setLastY]     = useState(0);

  useEffect(() => {
    setVisible(true);
    setLastY(0);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      // Always show navbar when near the top of the page
      if (currentY < 10) {
        setVisible(true);
      } else {
        setVisible(currentY < lastY); // show on scroll-up, hide on scroll-down
      }

      setLastY(currentY);

      // Close mobile menu when user scrolls
      if (menuOpen) setMenuOpen(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY, menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { visible, menuOpen, setMenuOpen };
}
