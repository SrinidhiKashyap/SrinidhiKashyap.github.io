import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * BeeCursorTrail
 *
 * Renders a small bee SVG that follows the mouse with a fading honey-dot trail.
 * The trail and bee accent colors change based on the current page:
 *   - Default (home, service, contact): honey yellow (#F2B01E)
 *   - Kalpa detail page:                  leaf green (#70AB3B) → blue (#0B2145)
 *   - Sterkros detail page:               fitness red (#DC2626) → dark
 *
 * Mount once inside WebsiteApp — it overlays the entire page.
 * The component is pointer-events:none so it never blocks clicks.
 * On touch devices the entire effect is disabled — no DOM is created.
 */

type PageTheme = "default" | "kalpa" | "sterkros";

function getPageTheme(): PageTheme {
  const path = window.location.pathname;
  if (path.includes("kalpa")) return "kalpa";
  if (path.includes("sterkros")) return "sterkros";
  return "default";
}

/** Return the accent colour and trail palette for the current page. */
function getThemeColors(theme: PageTheme) {
  switch (theme) {
    case "kalpa":
      return {
        accent: "#70AB3B",        // leaf green — bee body & wing accents
        stroke: "#3d6b1e",        // darker leaf for SVG stroke
        trail:  ["#70AB3B", "#8bc45a", "#a4d67a", "#ccefb0", "#e3f5d4"], // green → pale
      };
    case "sterkros":
      return {
        accent: "#DC2626",        // fitness red — bee body & wing accents
        stroke: "#991b1b",        // darker red for SVG stroke
        trail:  ["#DC2626", "#e05050", "#e87a7a", "#f0a3a3", "#f8cccc"], // red → pale
      };
    default:
      return {
        accent: "#F2B01E",        // bee yellow — default brand accent
        stroke: "#c48a0a",        // darker yellow for SVG stroke
        trail:  ["#F2B01E", "#f5c04a", "#f7d070", "#fae09a", "#fdeec4"], // honey yellow
      };
  }
}

/** Returns true if the device likely has a pointing device (mouse/trackpad). */
function isPointerDevice(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function BeeCursorTrail() {
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // ── Skip entirely on touch devices ──────────────────────────────────────────
    if (!isPointerDevice()) return;

    const root = rootRef.current;
    if (!root) return;

    // ── Inject cursor:none for pointer devices ─────────────────────────────────
    const cursorStyle = document.createElement("style");
    cursorStyle.textContent =
      "@media (hover: hover) { html, body, * { cursor: none !important; } }";
    document.head.appendChild(cursorStyle);

    // ── Detect page theme ─────────────────────────────────────────────────────
    const theme = getPageTheme();
    const { accent, stroke, trail: TRAIL_COLORS } = getThemeColors(theme);

    // ── Config ────────────────────────────────────────────────────────────────
    const TRAIL_LENGTH = 14;   // number of trailing dots
    const BEE_LERP     = 0.35; // how quickly the bee chases the cursor (0–1)
    const BOB_SPEED    = 0.06; // how fast the bee bobs up and down
    const BOB_AMP      = 3;    // bob amplitude in px
    const TILT_MAX     = 22;   // max tilt angle in degrees when banking left/right

    // ── Build bee SVG ─────────────────────────────────────────────────────────
    const bee = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    bee.setAttribute("viewBox", "0 0 40 40");
    bee.style.cssText =
      "position:fixed;width:28px;height:28px;pointer-events:none;transform:translate(-50%,-50%);will-change:transform,left,top;z-index:99999;";
    bee.innerHTML = `
      <ellipse cx="20" cy="22" rx="10" ry="7" fill="${accent}"/>
      <ellipse cx="20" cy="21" rx="6" ry="3" fill="#1a1a1a" opacity=".5"/>
      <ellipse cx="20" cy="24" rx="6" ry="3" fill="#1a1a1a" opacity=".5"/>
      <ellipse cx="20" cy="22" rx="10" ry="7" fill="none" stroke="${stroke}" stroke-width=".8"/>
      <ellipse cx="20" cy="15" rx="5" ry="4" fill="#1a1a1a"/>
      <circle cx="18" cy="13.5" r="1.2" fill="${accent}" opacity=".6"/>
      <circle cx="22" cy="13.5" r="1.2" fill="${accent}" opacity=".6"/>
      <ellipse cx="13" cy="17" rx="7" ry="3.5" fill="white" opacity=".82" transform="rotate(-20 13 17)"/>
      <ellipse cx="27" cy="17" rx="7" ry="3.5" fill="white" opacity=".82" transform="rotate(20 27 17)"/>
      <ellipse cx="13" cy="17" rx="7" ry="3.5" fill="none" stroke="#cce" stroke-width=".5" opacity=".5" transform="rotate(-20 13 17)"/>
      <ellipse cx="27" cy="17" rx="7" ry="3.5" fill="none" stroke="#cce" stroke-width=".5" opacity=".5" transform="rotate(20 27 17)"/>
      <line x1="18" y1="12" x2="15" y2="8" stroke="#1a1a1a" stroke-width=".8" stroke-linecap="round"/>
      <line x1="22" y1="12" x2="25" y2="8" stroke="#1a1a1a" stroke-width=".8" stroke-linecap="round"/>
      <circle cx="15" cy="7.5" r="1.2" fill="${accent}"/>
      <circle cx="25" cy="7.5" r="1.2" fill="${accent}"/>
    `;
    root.appendChild(bee);

    // ── Build trail dots ───────────────────────────────────────────────────────
    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const t    = i / TRAIL_LENGTH;
      const size = Math.round(10 * (1 - t) + 2);
      const ci   = Math.min(Math.floor(t * TRAIL_COLORS.length), TRAIL_COLORS.length - 1);
      const dot  = document.createElement("div");
      dot.style.cssText = [
        "position:fixed",
        `width:${size}px`,
        `height:${size}px`,
        "border-radius:50%",
        `background:${TRAIL_COLORS[ci]}`,
        `opacity:${(1 - t * 0.85).toFixed(2)}`,
        "pointer-events:none",
        "transform:translate(-50%,-50%)",
        "will-change:left,top",
        "z-index:99998",
      ].join(";");
      root.appendChild(dot);
      dots.push(dot);
    }

    // ── State ─────────────────────────────────────────────────────────────────
    let mouseX = -500, mouseY = -500;
    let beeX   = -500, beeY   = -500;
    let lastBeeX = -500;
    let bobOffset = 0;
    let tiltAngle = 0;
    // Ring buffer of recent bee positions for the trail
    const history: { x: number; y: number }[] = Array(TRAIL_LENGTH)
      .fill(null)
      .map(() => ({ x: -500, y: -500 }));

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);

    // ── Animation loop ────────────────────────────────────────────────────────
    let rafId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      bobOffset += BOB_SPEED;
      const bob = Math.sin(bobOffset) * BOB_AMP;

      beeX = lerp(beeX, mouseX, BEE_LERP);
      beeY = lerp(beeY, mouseY + bob, BEE_LERP);

      // Tilt bee based on horizontal velocity
      const dx = beeX - lastBeeX;
      tiltAngle = lerp(tiltAngle, Math.max(-TILT_MAX, Math.min(TILT_MAX, dx * 2.5)), 0.12);
      lastBeeX = beeX;

      bee.style.left      = `${beeX}px`;
      bee.style.top       = `${beeY}px`;
      bee.style.transform = `translate(-50%,-50%) rotate(${tiltAngle}deg)`;

      // Push current bee position into history ring
      history.unshift({ x: beeX, y: beeY });
      history.length = TRAIL_LENGTH;

      // Position each dot at a past position
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const p = history[i];
        dots[i].style.left = `${p.x}px`;
        dots[i].style.top  = `${p.y}px`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      cursorStyle.remove();
      // Remove all DOM elements we created so they don't accumulate on re-mount
      while (root.firstChild) {
        root.removeChild(root.firstChild);
      }
    };
  }, [location.pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99998,
        overflow: "hidden",
      }}
    />
  );
}