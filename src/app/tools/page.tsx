import Brand_top_sells from "@/components/Main_page__DrinkAndTools/brand_top_sells/Brand_top_sells";
import Brands from "@/components/Main_page__DrinkAndTools/brands/Brands";
import Cat_by_use from "@/components/Main_page__DrinkAndTools/cat_by_use/Cat_by_use";
import Tools_cats from "@/components/Main_page__DrinkAndTools/tools_cats/Tools_cats";
import Show_all from "@/components/Main_page__DrinkAndTools/show_all/Show_all";
import Hero from "@/components/Main_page__DrinkAndTools/tools_hero/Hero";
import { prisma } from "@/lib/db/prisma";
import { MainCat_with_Specific_cats } from "@/types/type";
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
  title: "ترانه - لوازم تهیه نوشیدنی",
  description:
    "انواع لوازم تهیه نوشیدنی ها از جمله آسیاب قهوه اسپرسو ساز قهوه ساز و قهوه جوش",
};

const ToolsPage = async () => {
  const tools = await getCategories();

  return (
    <div>
      <Hero />
      <div className="mt-2 p-4 max-w-[90rem] m-auto flex flex-col gap-5">
        <Tools_cats Main_cat={tools} />
        <Show_all
          alt={tools.label}
          image_url={tools.image}
          label="نمایش تمام ابزار های تهیه نوشیدنی"
        />
        <Brands drinks_id={tools.id} title="برترین برند ها" />
        <Cat_by_use />
        {/* <Brand_top_sells brand_titleEn="Farmand" /> */}
      </div>
    </div>
  );
};

export default ToolsPage;
