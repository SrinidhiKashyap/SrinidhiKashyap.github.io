import { BrowserRouter } from "react-router-dom";
import { SiteLoader } from "../shared/components/layout/SiteLoader";
import { AppRoutes } from "./routes";
import { ScrollToHash } from "./ScrollToHash";
import { BeeCursorTrail } from "../shared/components/ui/BeeCursorTrail";

export default function WebsiteApp() {
  return (
    <BrowserRouter>
      <SiteLoader />
      <ScrollToHash />
      <BeeCursorTrail/> 
      <AppRoutes />
    </BrowserRouter>
  );
}
