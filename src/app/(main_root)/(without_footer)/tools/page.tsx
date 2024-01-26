import Brands from "@/components/Pages/DrinkAndTools_page/util/brands/Brands";
import Cat_by_use from "@/components/Pages/DrinkAndTools_page/tools/cat_by_use/Cat_by_use";
import Tools_cats from "@/components/Pages/DrinkAndTools_page/tools/tools_cats/Tools_cats";
import Show_all from "@/components/Pages/DrinkAndTools_page/util/show_all/Show_all";
import Hero from "@/components/Pages/DrinkAndTools_page/tools/tools_hero/Hero";
import { prisma } from "@/lib/db/prisma";
import { MainCat_with_Specific_cats } from "@/types_validation/type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

const getCategories = cache(async () => {
  const drinksSpecficCats: MainCat_with_Specific_cats | null =
    await prisma.main_cat.findFirst({
      where: { label: "tools" },
      include: { Specific_cat: true },
    });
  if (!drinksSpecficCats) {
    return notFound();
  }
  return drinksSpecficCats;
});

export const metadata: Metadata = {
  title: "لوازم تهیه نوشیدنی",
  description:
    "انواع لوازم تهیه نوشیدنی ها از جمله آسیاب قهوه اسپرسو ساز قهوه ساز و قهوه جوش",
};

const ToolsPage = async () => {
  const tools = await getCategories();

  return (
    <div>
      <Hero />
      <div className="m-auto mt-2 flex max-w-[90rem] flex-col gap-5 p-4">
        <Tools_cats Main_cat={tools} />
        <Show_all
          alt={tools.label}
          image_url={tools.image}
          label="نمایش تمام ابزار های تهیه نوشیدنی"
        />
        <Brands drinks_id={tools.id} title="برترین برند ها" />
        <Cat_by_use />
      </div>
    </div>
  );
};

export default ToolsPage;
