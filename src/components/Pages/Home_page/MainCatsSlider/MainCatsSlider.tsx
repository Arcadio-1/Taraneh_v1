import Slider from "@/components/Util/components/products_Slider/Products_Slider";
import { AllCatsTopsViewProducts } from "@/types_validation/type";
import React from "react";
import { prisma } from "@/lib/db/prisma";
import { Main_cat } from "@prisma/client";

interface Props {}

const MainCatsSlider = async ({}: Props) => {
  const mainCats: Main_cat[] = await prisma.main_cat.findMany();

  const topSellToolsProducts: Promise<AllCatsTopsViewProducts>[] = mainCats.map(
    async (mainCatItem: Main_cat): Promise<AllCatsTopsViewProducts> => {
      return await prisma.product.findMany({
        take: 10,
        where: { main_cat_id: mainCatItem.id, status: true },
        orderBy: { statistics: { views: "asc" } },
        include: { main_cat: true },
      });
    },
  );

  const lists_of_lists: AllCatsTopsViewProducts[] =
    await Promise.all(topSellToolsProducts);

  return (
    <section>
      {lists_of_lists.map((catProducts) => {
        return (
          <div key={Math.random()} className=" border-b-2 border-gray-50">
            <Slider
              heroSlide={{
                image_url: catProducts[0].main_cat.image,
                link_url: `/${catProducts[0].main_cat.label}`,
                title: `پرفروش ترین ${catProducts[0].main_cat.title}`,
              }}
              bg_color={`bg-g1_7`}
              products={catProducts}
            />
          </div>
        );
      })}
    </section>
  );
};

export default MainCatsSlider;
