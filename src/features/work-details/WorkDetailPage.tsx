import { lazy, Suspense } from "react";
import type { LazyExoticComponent, ComponentType } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import { PageLayout } from "../../shared/components/layout/PageLayout";
import { workDetails } from "./data/workDetails";
import { WorkDetailHero } from "./components/WorkDetailHero";
import { WorkResults } from "./components/WorkResults";
import { WorkShowcase } from "./components/WorkShowcase";
import "./work-detail.css";

type LazyDetailPage = LazyExoticComponent<ComponentType>;

const CUSTOM_DETAIL_PAGES: Readonly<Record<string, LazyDetailPage>> = {
  sterkros: lazy(() => import("./components/SterkrosDetailPage").then((module) => ({ default: module.SterkrosDetailPage }))),
  kalpa: lazy(() => import("./components/KalpaDetailPage").then((module) => ({ default: module.KalpaDetailPage }))),
  "title-design": lazy(() => import("./components/TitleDesignDetailPage").then((module) => ({ default: module.TitleDesignDetailPage }))),
  magazine: lazy(() => import("./components/MagazineDetailPage").then((module) => ({ default: module.MagazineDetailPage }))),
  website: lazy(() => import("./components/WebsiteDetailPage").then((module) => ({ default: module.WebsiteDetailPage }))),
  "logo-design": lazy(() => import("./components/LogoDesignDetailPage").then((module) => ({ default: module.LogoDesignDetailPage }))),
  uiux: lazy(() => import("./components/UiUxDetailPage").then((module) => ({ default: module.UiUxDetailPage }))),
};

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? workDetails[slug] : undefined;
  const CustomDetailPage = slug ? CUSTOM_DETAIL_PAGES[slug] : undefined;

  if (!work) return <Navigate to={ROUTES.home} replace />;

  return (
    <PageLayout>
      {CustomDetailPage ? (
        <Suspense fallback={<div className="min-h-screen bg-bee-bg-primary" />}>
          <CustomDetailPage />
        </Suspense>
      ) : (
        <>
          <WorkDetailHero work={work} />
          <WorkShowcase work={work} />
          <WorkResults work={work} />
        </>
      )}
    </PageLayout>
  );
}
