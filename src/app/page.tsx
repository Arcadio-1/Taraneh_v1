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
      <div className="bg-[url('/image/coffee_background_2.jpg')] bg-cover bg-center bg-no-repeat">
        {/* <div className="bg-gray-400 py-4"> */}
        <h1 className="mb-5 text-2xl bg-slate-50 w-full py-4 bg-opacity-40 text-center font-iranyekan_bold">
          خرید بر اساس دسته بندی
        </h1>
        <ManeCats cats={cats} />
        <Cat_section_2 cats={cats} />
      </div>
      <AdSlider />
    </div>
  );
}
