import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteNavbar } from "./SiteNavbar";

type PageLayoutProps = {
  children: ReactNode;
};

/**
 * PageLayout
 *
 * The single layout wrapper for every page in the app.
 * Replaces DarkLayout entirely — delete DarkLayout.tsx once this is in place.
 *
 * Usage:
 *   export default function ServicePage() {
 *     return (
 *       <PageLayout>
 *         <main>...</main>
 *       </PageLayout>
 *     );
 *   }
 *
 * SiteNavbar is position:fixed so it sits above content.
 * The `pt-[76px]` on the inner div pushes content below the navbar height.
 * If you change the navbar height, update that value here.
 */
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-bee-bg-primary text-white antialiased">
      <SiteNavbar />
      {/* Offset content below the fixed navbar (navbar height = 76px) */}
      <div className="pt-[76px]">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}