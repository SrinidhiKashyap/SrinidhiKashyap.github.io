import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // base tells Vite what path prefix to use for all asset URLs in the build.
  //
  // GitHub Pages hosts your site at one of two URL patterns:
  //
  //   User/org site:   https://username.github.io          → base: "/"
  //   Project site:    https://username.github.io/repo     → base: "/repo/"
  //
  // The workflow sets BASE_URL as an env var so this file works correctly
  // in both local dev (base defaults to "/") and in CI (base = what you set).
  //
  // If you forget to set this correctly you'll get a blank page because all
  // your JS/CSS asset paths will be wrong (e.g. /assets/index.js instead of
  // /repo-name/assets/index.js).
  base: process.env.BASE_URL ?? "/",

  build: {
    // Increase the warning threshold slightly — media-heavy pages are fine
    // with larger chunks. Default is 500kb which will warn on your video page.
    chunkSizeWarningLimit: 800,

    rollupOptions: {
      output: {
        // Split vendor code into a separate chunk so returning visitors
        // don't re-download React etc. when only your app code changes.
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});