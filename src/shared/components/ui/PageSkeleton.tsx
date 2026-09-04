import { classNames } from "../../lib/classNames";

interface SkeletonBlockProps {
  className?: string;
}

/** Accessible decorative placeholder used while a lazy page bundle loads. */
export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div aria-hidden className={classNames("animate-pulse rounded-card bg-white/10", className)} />
  );
}

/** Matches the repeating case-study media-and-intro layout. */
export function CaseStudySkeleton() {
  return (
    <main className="bg-bee-bg-primary px-section-x-sm py-8 sm:px-section-x-md lg:px-section-x-lg">
      <span className="sr-only" role="status">
        Loading project
      </span>
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <SkeletonBlock className="min-h-[280px] md:min-h-[420px]" />
        <div className="space-y-5">
          <SkeletonBlock className="h-12 w-3/4" />
          <SkeletonBlock className="h-20 w-full" />
          <SkeletonBlock className="h-7 w-1/2" />
          <SkeletonBlock className="h-24 w-2/3" />
        </div>
      </section>
      <SkeletonBlock className="mt-10 h-[42vh] w-full" />
    </main>
  );
}

/** Generic fallback for top-level pages with a header, copy, and content grid. */
export function PageSkeleton() {
  return (
    <main className="min-h-screen bg-bee-bg-primary px-section-x-sm py-12 sm:px-section-x-md lg:px-section-x-lg">
      <span className="sr-only" role="status">
        Loading page
      </span>
      <div className="mx-auto max-w-7xl space-y-8">
        <SkeletonBlock className="h-14 w-2/3 max-w-xl" />
        <SkeletonBlock className="h-28 w-full max-w-3xl" />
        <div className="grid gap-6 md:grid-cols-2">
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
        </div>
      </div>
    </main>
  );
}
