import React from "react";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Main_cat_list from "@/components/Main_page/main_cat_list/main_cat_list";
import { Main_cat } from "@prisma/client";
import { AllCatsTopsViewProducts } from "@/types/type";
import Main_cat_slider from "@/components/Main_page/main_cats_slider/main_cat_slider";

export const metadata: Metadata = {
  title: "ترانه - دسته بندی محصولات",
  description: "دسته بندی داینامیک محصولات",
};

const MainsCategoriesPage = async () => {
  const mainCats: Main_cat[] = await prisma.main_cat.findMany();

  const topSellToolsProducts: Promise<AllCatsTopsViewProducts>[] = mainCats.map(
    async (mainCatItem: Main_cat): Promise<AllCatsTopsViewProducts> => {
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
    <div>
      <Main_cat_list main_cats={mainCats} />
      <Main_cat_slider lists_of_lists={lists_of_lists} />
    </div>
  );
};

export default MainsCategoriesPage;
