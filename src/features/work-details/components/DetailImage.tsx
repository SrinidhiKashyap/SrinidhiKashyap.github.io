import { memo } from "react";
import type { CSSProperties } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

/**
 * Global set of image src values that have already been loaded.
 * Used to avoid re-lazy-loading images that were previously seen.
 */
const loadedImageSrcs = new Set<string>();

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DetailImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Tailwind or CSS class string applied to the <img> element */
  className: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** If true, loads eagerly (not lazy). Defaults to false. */
  priority?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Optimised detail-page image with lazy loading and memoised rendering.
 *
 * - Non-priority images use `loading="lazy"` and `decoding="async"`.
 * - Priority images load eagerly with `fetchpriority="high"`.
 * - Once an image URL has loaded once (tracked in `loadedImageSrcs`),
 *   subsequent renders treat it as a priority image to avoid re-lazy-loading.
 *
 * @example
 * ```tsx
 * <DetailImage src={kalpaAssets.bottle} alt="Kalpa bottle" className="w-full" priority />
 * ```
 */
export const DetailImage = memo(function DetailImage({
  src,
  alt,
  className,
  style,
  priority = false,
}: DetailImageProps) {
  const isCached = priority || loadedImageSrcs.has(src);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={isCached ? "eager" : "lazy"}
      decoding={isCached ? "sync" : "async"}
      {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
      onLoad={() => loadedImageSrcs.add(src)}
    />
  );
});