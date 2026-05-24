/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ─── Brand Colors ────────────────────────────────────────────────────────
      colors: {
        bee: {
          accent: "#F2B01E",  // Primary yellow — buttons, highlights, icons
          dark:   "#0F0F0F",  // Deepest background
          light:  "#F3EFE3",  // Light surface (for light-mode use)

          // Page section backgrounds (dark theme)
          bg: {
            shell:   "#121214", // SiteNavbar, SiteFooter, inner page base
            hero:    "#000000", // Hero section
            primary: "#181818", // Main sections (works, clients)
            surface: "#1A1A1A", // About section
            card:    "#242424", // Cards, testimonial panels
            footer:  "#171717", // Home footer body
            deep:    "#101010", // Stats bar, darkest non-hero areas
          },
        },
      },

      // ─── Typography Scale ─────────────────────────────────────────────────────
      fontSize: {
        "display-xl":  ["clamp(4.4rem, 13.5vw, 11.8rem)", { lineHeight: "1"    }],
        "heading-lg":  ["clamp(2.4rem, 4.8vw, 4rem)",     { lineHeight: "1.02" }],
        "heading-md":  ["clamp(2.2rem, 4.3vw, 4rem)",     { lineHeight: "1.12" }],
        "heading-sm":  ["clamp(2.1rem, 4.3vw, 4.2rem)",   { lineHeight: "1.1"  }],
        "title-fluid": ["clamp(1.125rem, 2vw, 2.125rem)", { lineHeight: "1.1"  }],
        "section-label": ["clamp(1rem, 1.4vw, 1.45rem)", { lineHeight: "1.2" }],
        "testimonial-heading": ["clamp(1.8rem, 2.8vw, 2.8rem)", { lineHeight: "1.08" }],
        "testimonial-quote": ["clamp(0.98rem, 1.12vw, 1.2rem)", { lineHeight: "1.62" }],
        "nav-link": ["clamp(1.05rem, 1.15vw, 1.35rem)", { lineHeight: "1.1" }],
        "copy-lg": ["clamp(1.05rem, 1.25vw, 1.45rem)", { lineHeight: "1.36" }],
        "label":       ["1.55rem",                         { lineHeight: "1"    }],
        "body-lg":     ["clamp(1.05rem, 2vw, 1.7rem)",    { lineHeight: "1.5"  }],
        "watermark":   ["clamp(4rem, 10vw, 8.6rem)",      { lineHeight: "1"    }],
      },

      // ─── Spacing ──────────────────────────────────────────────────────────────
      spacing: {
        "section-x-sm": "1.75rem",
        "section-x-md": "3.5rem",
        "section-x-lg": "6rem",
        "section-y":    "6rem",
        "card-offset":  "5.625rem",
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        card:  "18px",
        media: "24px",
        pill:  "999px",
      },

      // ─── Box Shadow ───────────────────────────────────────────────────────────
      boxShadow: {
        soft:      "0 8px 30px rgba(0,0,0,0.25)",
        "card-lg": "0 24px 60px rgba(0,0,0,0.28)",
        overlay:   "0 10px 40px rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.12)",
      },

      // ─── Backdrop Blur ────────────────────────────────────────────────────────
      backdropBlur: {
        overlay: "10px",
      },

      // ─── Transitions ──────────────────────────────────────────────────────────
      transitionDuration: {
        DEFAULT: "250ms",
        slow:    "350ms",
        slower:  "500ms",
        crawl:   "700ms",
      },
    },
  },
  plugins: [],
};
