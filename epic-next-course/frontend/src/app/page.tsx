import { loaders } from "@/data/loaders";

import { HeroSection } from "@/components/custom/hero-section";
import { FeaturesSection } from "@/components/custom/features-section";
import type { IHeroSection, IFeatureSection, TBlocks } from "@/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const homePageData = await loaders.getHomePageData();
  if (!homePageData?.data) notFound();

  const { blocks } = homePageData.data;

  function blockRenderer(block: TBlocks, index: number) {
    switch (block.__component) {
      case "layout.hero-section":
        return <HeroSection key={index} data={block as IHeroSection} />;
      case "layout.features-section":
        return <FeaturesSection key={index} data={block as IFeatureSection} />;
      default:
        return null;
    }
  }

  return (
    <main>{blocks.map((block, index) => blockRenderer(block, index))}</main>
  );
}
