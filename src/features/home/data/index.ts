/**
 * Home page data barrels.
 *
 * Split by domain concern so each data module is small and focused:
 * - `values.ts`     → studio values + stats
 * - `testimonials.ts` → client testimonials + partner logos
 * - `works.ts`       → portfolio work items
 * - `filters.ts`     → filter tab config + category labels
 */

export { VALUES, STATS } from "./values";
export type { ValueItem, StatItem } from "./values";

export { TESTIMONIALS, MARQUEE_LOGOS } from "./testimonials";
export type { TestimonialItem } from "./testimonials";

export { WORKS } from "./works";

export { WORK_FILTERS, WORK_CATEGORY_LABELS } from "./filters";