import Slider from "@/components/Util/products_Slider/Products_Slider";
import { prisma } from "@/lib/db/prisma";
import React from "react";

interface Props {
  brand_titleEn: string;
}

const Brand_top_sells = async ({ brand_titleEn }: Props) => {
  const farmand_brand = await prisma.brand.findFirst({
    where: { title_en: brand_titleEn },
  });

  const farmand_five_top_sells =
    farmand_brand &&
    (await prisma.product.findMany({
      take: 5,
      where: { brand_id: farmand_brand.id },
      orderBy: { statistics: { soled: "asc" } },
    }));

  return (
    <div className="">
      {!!farmand_five_top_sells && (
        <Slider
          heroSlide={{
            image_url: farmand_brand.image,
            link_url: `search/${farmand_brand.title_en}}`,
            title: `پرفروش ترین محصولات ${farmand_brand.title_fr}`,
          }}
          bg_color={`bg-amber-500`}
          classes="rounded-xl"
          products={farmand_five_top_sells}
        />
      )}
    </div>
  );
};

export default Brand_top_sells;
