import AdSlider from "@/components/Util/ad_slider/AdSlider";
import Hero from "@/components/Home_page/hero/Hero";
import Cat_section_2 from "@/components/Home_page/catSection/cat_section_2";
import {
  AllCatsTopsViewProducts,
  MainCatsWithSpecificCats,
} from "@/types/type";
import { prisma } from "@/lib/db/prisma";
import ManeCats from "@/components/Home_page/maneCats/maneCats";
import Main_cat_list from "@/components/Main_page/main_cat_list/main_cat_list";
import Main_cat_slider from "@/components/Main_page/main_cats_slider/main_cat_slider";

export default async function Home() {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  const topSellToolsProducts: Promise<AllCatsTopsViewProducts>[] = cats.map(
    async (
      mainCatItem: MainCatsWithSpecificCats
    ): Promise<AllCatsTopsViewProducts> => {
      return await prisma.product.findMany({
        take: 10,
        where: { main_cat_id: mainCatItem.id, status: true },
        orderBy: { statistics: { views: "asc" } },
        include: { main_cat: true },
      });
    }
  );

  const lists_of_lists: AllCatsTopsViewProducts[] = await Promise.all(
    topSellToolsProducts
  );
  return (
    <div className="flex flex-col gap-3">
      <Hero />
      <div className="bg-[url('/image/coffee_background_2.jpg')] bg-cover bg-center bg-no-repeat">
        {/* <div className="bg-gray-400 py-4"> */}
        <h1 className="mb-5 text-2xl bg-g1_7 w-full py-4 bg-opacity-60 text-center font-iranyekan_bold text-white">
          خرید بر اساس دسته بندی
        </h1>
        {/* <ManeCats cats={cats} /> */}
        <Cat_section_2 cats={cats} />
      </div>
      <AdSlider />
      <Main_cat_list main_cats={cats} />
      <Main_cat_slider lists_of_lists={lists_of_lists} />
    </div>
  );
}
