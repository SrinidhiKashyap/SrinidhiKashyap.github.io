import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const WorkDetailPage = lazy(() => import("../pages/WorkDetailPage"));

function RouteFallback() {
  return <div className="min-h-screen bg-bee-bg-primary" />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:slug" element={<WorkDetailPage />} />
      </Routes>
    </Suspense>
  );
}
