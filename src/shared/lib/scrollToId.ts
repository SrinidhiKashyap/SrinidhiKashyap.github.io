/**
 * scrollToId
 *
 * Smooth-scrolls to the element with the given `id`.
 * Special case: `id === "home"` scrolls to the top of the page.
 *
 * @param id - The DOM element id to scroll to (or "home" for top-of-page).
 */
export function scrollToId(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}