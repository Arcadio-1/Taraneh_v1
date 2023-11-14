import AdSlider from "@/components/Util/ad_slider/AdSlider";
import Hero from "@/components/Home_page/hero/Hero";
import Cat_section_2 from "@/components/Home_page/catSection/cat_section_2";
import { MainCatsWithSpecificCats } from "@/types/type";
import { prisma } from "@/lib/db/prisma";
import ManeCats from "@/components/Home_page/maneCats/maneCats";

export default async function Home() {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  return (
    <div className="flex flex-col gap-3">
      <Hero />
      <div className="bg-[url('/image/coffee_background.jpg')] bg-cover bg-center bg-no-repeat">
        <Cat_section_2 cats={cats} />
        <ManeCats cats={cats} />
      </div>
      <AdSlider />
    </div>
  );
}
