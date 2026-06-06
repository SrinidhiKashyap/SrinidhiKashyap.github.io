import { BrowserRouter } from "react-router-dom";
import { SiteLoader } from "../shared/components/layout/SiteLoader";
import { AppRoutes } from "./AppRoutes";
import { ScrollToHash } from "./ScrollToHash";
import { BeeCursorTrail } from "../shared/components/ui/BeeCursorTrail";

export function WebsiteApp() {
  return (
    <BrowserRouter>
      <SiteLoader />
      <ScrollToHash />
      <BeeCursorTrail/> 
      <AppRoutes />
    </BrowserRouter>
  );
}