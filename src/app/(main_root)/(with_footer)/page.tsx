import AdSlider from "@/components/Util/components/ad_slider/AdSlider";
import Hero from "@/components/Pages/Home_page/hero/Hero";
import SpecificCats from "@/components/Pages/Home_page/SpecificCats/SpecificCats";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import { prisma } from "@/lib/db/prisma";
import MainCatsBanner from "@/components/Pages/Home_page/MainCatsBanner/MainCatsBanner";
import MainCatsSlider from "@/components/Pages/Home_page/MainCatsSlider/MainCatsSlider";

export default async function Home() {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="flex flex-col gap-3">
      <Hero />
      <SpecificCats cats={cats} />
      <AdSlider />
      <MainCatsBanner main_cats={cats} />
      <MainCatsSlider />
    </div>
  );
}
