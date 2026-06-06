import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type VisibilityCallback = (visible: boolean) => void;

interface DetailVideoContextValue {
  observe: (el: Element, cb: VisibilityCallback) => void;
  unobserve: (el: Element) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const DetailVideoContext = createContext<DetailVideoContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

/**
 * Provides shared IntersectionObserver-based visibility tracking for detail
 * page videos. Videos within this provider pause when scrolled out of view
 * and resume when scrolled back in.
 *
 * Wrap a page or section with `<DetailVideoProvider>` to enable this behaviour.
 *
 * @example
 * ```tsx
 * <DetailVideoProvider>
 *   <DetailVideo src={videoSrc} />
 * </DetailVideoProvider>
 * ```
 */
export function DetailVideoProvider({ children }: { children: ReactNode }) {
  const state = useRef({
    callbacks: new Map<Element, VisibilityCallback>(),
    debounceTimers: new Map<Element, ReturnType<typeof setTimeout>>(),
    observer: null as IntersectionObserver | null,
  });

  const ctx = useRef<DetailVideoContextValue>({
    observe(el: Element, cb: VisibilityCallback) {
      const s = state.current;
      if (!s.observer) {
        s.observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const handler = s.callbacks.get(entry.target);
              if (!handler) continue;

              const existing = s.debounceTimers.get(entry.target);
              if (existing) clearTimeout(existing);

              const visible = entry.isIntersecting;
              const timer = setTimeout(() => {
                s.debounceTimers.delete(entry.target);
                handler(visible);
              }, 150);
              s.debounceTimers.set(entry.target, timer);
            }
          },
          { rootMargin: "80px 0px", threshold: 0.1 },
        );
      }
      s.callbacks.set(el, cb);
      s.observer.observe(el);
    },
    unobserve(el: Element) {
      const s = state.current;
      s.observer?.unobserve(el);
      s.callbacks.delete(el);
      const timer = s.debounceTimers.get(el);
      if (timer) {
        clearTimeout(timer);
        s.debounceTimers.delete(el);
      }
    },
  });

  useEffect(() => {
    return () => {
      const s = state.current;
      s.observer?.disconnect();
      s.callbacks.clear();
      s.debounceTimers.forEach(clearTimeout);
      s.debounceTimers.clear();
    };
  }, []);

  return (
    <DetailVideoContext.Provider value={ctx.current}>
      {children}
    </DetailVideoContext.Provider>
  );
}

// ── Consumer hook ─────────────────────────────────────────────────────────────

/**
 * Internal hook to access the video visibility observer.
 * Must be called within a `<DetailVideoProvider>`.
 */
export function useVideoObserver(): DetailVideoContextValue {
  const ctx = useContext(DetailVideoContext);
  if (!ctx) throw new Error("useVideoObserver must be used inside DetailVideoProvider");
  return ctx;
}