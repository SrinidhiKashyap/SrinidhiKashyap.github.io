import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import { PageLayout } from "../../shared/components/layout/PageLayout";

/**
 * 404 page — shown when no route matches the current URL.
 */
export function NotFoundPage() {
  return (
    <PageLayout>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-display-xl font-bold text-bee-accent">404</h1>
        <p className="mt-4 text-copy-lg text-white/70">This page doesn't exist.</p>
        <Link
          to={ROUTES.home}
          className="mt-8 rounded-pill bg-bee-accent px-8 py-3 text-base font-semibold text-black transition hover:brightness-110"
        >
          Go Home
        </Link>
      </section>
    </PageLayout>
  );
}
