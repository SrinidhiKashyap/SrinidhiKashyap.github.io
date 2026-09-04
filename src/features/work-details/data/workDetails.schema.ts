import { z } from "zod";

/**
 * Zod schema for `DetailPageData` — validates work detail entries at import time.
 * Catches missing fields, wrong types, and structural drift before it reaches the UI.
 */
export const DetailPageDataSchema = z.object({
  title: z.string().min(1, "title is required"),
  summary: z.string().min(1, "summary is required"),
  scope: z.array(z.string()).min(1, "scope must have at least one item"),
  hero: z.string().min(1, "hero image path is required"),
  showcaseVideo: z.string().min(1, "showcaseVideo path is required"),
  gallery: z.array(z.string()),
  deliverables: z.string().min(1, "deliverables is required"),
  challenge: z.string().min(1, "challenge is required"),
  outcome: z.string().min(1, "outcome is required"),
});

export type DetailPageData = z.infer<typeof DetailPageDataSchema>;

/**
 * Validates a raw record against the schema.
 * Throws a descriptive error if validation fails.
 */
export function validateDetailPageData(slug: string, data: unknown): DetailPageData {
  const result = DetailPageDataSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  [${i.path.join(".")}] ${i.message}`)
      .join("\n");
    throw new Error(`workDetails["${slug}"] validation failed:\n${issues}`);
  }
  return result.data;
}
