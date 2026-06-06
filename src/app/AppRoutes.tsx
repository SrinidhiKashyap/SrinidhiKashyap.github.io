import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

/**
 * Route path constants — change here to update all references at once.
 */
export const ROUTES = {
  HOME: "/",
  SERVICE: "/service",
  CONTACT: "/contact",
  WORK_DETAIL: "/:slug",
} as const;

// ── Lazy-loaded page bundles ──────────────────────────────────────────────────

const HomePage = lazy(() =>
  import("../features/home/HomePage").then((m) => ({ default: m.HomePage }))
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
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SERVICE} element={<ServicePage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.WORK_DETAIL} element={<WorkDetailPage />} />
      </Routes>
    </Suspense>
  );
}