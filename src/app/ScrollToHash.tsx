import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToHash
 *
 * Listens for hash changes in the URL and scrolls to the corresponding
 * element on the page. If no hash is present, scrolls to top.
 *
 * Uses `requestAnimationFrame` to ensure the DOM has painted before
 * calling `scrollIntoView`.
 */
export function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, pathname]);

  return null;
}