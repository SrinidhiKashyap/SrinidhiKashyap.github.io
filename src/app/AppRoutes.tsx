import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import { ErrorBoundary } from "../shared/components/ui/ErrorBoundary";

/**
 * Route path constants — change here to update all references at once.
 */
// ── Lazy-loaded page bundles ──────────────────────────────────────────────────

const HomePage = lazy(() =>
  import("../features/home/HomePage").then((m) => ({ default: m.HomePage }))
);
const AboutPage = lazy(() =>
  import("../features/about/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const ServicePage = lazy(() =>
  import("../features/services/ServicePage").then((m) => ({ default: m.ServicePage }))
);
const ContactPage = lazy(() =>
  import("../features/contact/ContactPage").then((m) => ({ default: m.ContactPage }))
);
const WorkDetailPage = lazy(() =>
  import("../features/work-details/WorkDetailPage").then((m) => ({ default: m.WorkDetailPage }))
);
const NotFoundPage = lazy(() =>
  import("../features/not-found/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

/**
 * Minimal loading fallback shown while a page chunk loads.
 */
function RouteFallback() {
  return <div className="min-h-screen bg-bee-bg-primary" />;
}

/**
 * Top-level application routes.
 *
 * Every page in the app is registered here. To add a new page:
 * 1. Create the page component in `src/features/<name>/`
 * 2. Lazy-load it above
 * 3. Add a `<Route>` below
 *
 * Each lazy route is wrapped with ErrorBoundary so a render crash in one
 * page doesn't take down the entire app.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <HomePage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path={ROUTES.about}
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path={ROUTES.service}
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <ServicePage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path={ROUTES.contact}
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path={ROUTES.workDetail}
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <WorkDetailPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
      <Route
        path="*"
        element={
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}
