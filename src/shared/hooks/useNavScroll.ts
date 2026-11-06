import { useEffect, useRef, useState } from "react";
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
  const isHome = location.pathname === "/";
  const [visible, setVisible] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const hideTimerRef = useRef<number | undefined>(undefined);

  function clearHideTimer() {
    if (hideTimerRef.current !== undefined) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    }
  }

  function revealHomeNav() {
    if (!isHome) return;
    setVisible(true);
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = undefined;
    }, 2200);
  }

  useEffect(() => {
    setVisible(!isHome);
    setLastY(0);
    setMenuOpen(false);
    clearHideTimer();
  }, [isHome, location.pathname]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;

      if (isHome) {
        revealHomeNav();
      } else if (currentY < 10) {
        setVisible(true);
      } else {
        setVisible(currentY < lastY);
      }

      setLastY(currentY);

      // Close mobile menu when user scrolls
      if (menuOpen) setMenuOpen(false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, lastY, menuOpen]);

  useEffect(() => {
    if (!isHome) return;

    window.addEventListener("pointermove", revealHomeNav, { passive: true });
    window.addEventListener("touchstart", revealHomeNav, { passive: true });
    return () => {
      window.removeEventListener("pointermove", revealHomeNav);
      window.removeEventListener("touchstart", revealHomeNav);
      clearHideTimer();
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !menuOpen) return;
    clearHideTimer();
    setVisible(true);
  }, [isHome, menuOpen]);

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
