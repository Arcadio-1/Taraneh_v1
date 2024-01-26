import AdSlider from "@/components/Util/components/ad_slider/AdSlider";
import Hero from "@/components/Pages/Home_page/hero/Hero";
import Cat_section_2 from "@/components/Pages/Home_page/catSection/cat_section_2";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import { prisma } from "@/lib/db/prisma";
import Main_cat_list from "@/components/Pages/Main_page/main_cat_list/main_cat_list";
import Main_cat_slider from "@/components/Pages/Main_page/main_cats_slider/main_cat_slider";

export default async function Home() {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="flex flex-col gap-3">
      <Hero />
      <Cat_section_2 cats={cats} />
      <AdSlider />
      <Main_cat_list main_cats={cats} />
      <Main_cat_slider />
    </div>
  );
}
