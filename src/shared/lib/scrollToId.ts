export function scrollToId(id: string) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
