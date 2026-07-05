import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { ScrollToHash } from "./ScrollToHash";
import { BeeCursorTrail } from "../shared/components/ui/BeeCursorTrail";

export function WebsiteApp() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <BeeCursorTrail />
      <AppRoutes />
    </BrowserRouter>
  );
}
