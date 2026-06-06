import { useCallback, useState } from "react";
import PageLayout from "../../shared/components/layout/PageLayout";
import type { HomeWorkFilter } from "./types/home";
import { AboutSection } from "./components/AboutSection";
import { ClientsTestimonialsSection } from "./components/ClientsTestimonialsSection";
import { HeroSection } from "./components/HeroSection";
import { ValuesSection } from "./components/ValuesSection";
import { WorksSection } from "./components/WorksSection";
import "./home.css";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<HomeWorkFilter>("All Work");
  const handleCategoryChange = useCallback((category: HomeWorkFilter) => {
    setActiveCategory(category);
  }, []);

  return (
    <PageLayout>
      {/*
       * HeroSection has id="home" — the navbar logo scroll target.
       * PageLayout's pt-[54px] offsets content below the fixed navbar,
       * but HeroSection sets its own min-height so it still fills the viewport.
       */}
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <WorksSection activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <ClientsTestimonialsSection />
    </PageLayout>
  );
}
