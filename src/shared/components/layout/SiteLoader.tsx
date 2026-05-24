import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ASSETS } from "../../lib/assets";

const MINIMUM_LOADER_MS = 900;
const ROUTE_LOADER_MS = 650;

export function SiteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const hasMounted = useRef(false);

  useEffect(() => {
    const startedAt = window.performance.now();

    function hideLoader() {
      const elapsed = window.performance.now() - startedAt;
      const remaining = Math.max(MINIMUM_LOADER_MS - elapsed, 0);
      window.setTimeout(() => setVisible(false), remaining);
    }

    if (document.readyState === "complete") {
      hideLoader();
      return;
    }

    window.addEventListener("load", hideLoader, { once: true });
    return () => window.removeEventListener("load", hideLoader);
  }, []);

  useLayoutEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setVisible(true);

    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, ROUTE_LOADER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-black">
      <img src={ASSETS.gifLoader} alt="Loading Bee Concept" className="h-40 w-40 object-contain sm:h-52 sm:w-52" />
    </div>
  );
}
