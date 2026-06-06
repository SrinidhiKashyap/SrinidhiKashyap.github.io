import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "../../shared/components/layout/PageLayout";
import { workDetails } from "./data/workDetails";
import { WorkDetailHero } from "./components/WorkDetailHero";
import { WorkResults } from "./components/WorkResults";
import { WorkShowcase } from "./components/WorkShowcase";
import { SterkrosDetailPage } from "./components/SterkrosDetailPage";
import { KalpaDetailPage } from "./components/KalpaDetailPage";
import "./work-detail.css";

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const work = slug ? workDetails[slug] : undefined;

  if (!work) return <Navigate to="/" replace />;

  return (
    <PageLayout>
      {slug === "sterkros" ? (
        <SterkrosDetailPage />
      ) : slug === "kalpa" ? (
        <KalpaDetailPage />
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