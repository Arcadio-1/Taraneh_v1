import AdSlider from "@/components/Util/ad_slider/AdSlider";
import Hero from "@/components/Home_page/hero/Hero";
import Cat_section_2 from "@/components/Home_page/catSection/cat_section_2";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import { prisma } from "@/lib/db/prisma";
import Main_cat_list from "@/components/Main_page/main_cat_list/main_cat_list";
import Main_cat_slider from "@/components/Main_page/main_cats_slider/main_cat_slider";
import { Suspense } from "react";

export default async function Home() {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="flex flex-col gap-3">
      {/* <Suspense fallback={<p>loading hero</p>}> */}
      <Hero />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>loading</p>}> */}
      <Cat_section_2 cats={cats} />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>loading</p>}> */}
      <AdSlider />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>loading</p>}> */}
      <Main_cat_list main_cats={cats} />
      {/* </Suspense> */}
      {/* <Suspense fallback={<p>loading</p>}> */}
      <Main_cat_slider />
      {/* </Suspense> */}
    </div>
  );
}
