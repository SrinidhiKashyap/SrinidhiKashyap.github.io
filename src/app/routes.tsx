import { Route, Routes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import ServicePage from "../pages/ServicePage";
import WorkDetailPage from "../pages/WorkDetailPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/:slug" element={<WorkDetailPage />} />
    </Routes>
  );
}
