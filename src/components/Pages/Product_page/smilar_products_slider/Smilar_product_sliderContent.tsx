import React from "react";
import Slider from "@/components/Util/components/products_Slider/Products_Slider";
import { AdWithProducts } from "@/types_validation/type";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";

type Props = {
  title: string;
};

const Smilar_product_sliderContent = async ({ title }: Props) => {
  const adProducts: AdWithProducts[] = await prisma.ad.findMany({
    take: 12,
    where: { product: { status: true } },
    select: { product: true },
  });
  const products: Product[] = adProducts.map((product) => {
    return product.product;
  });
  return (
    <div className="rounded-lg border">
      <div className="px-5 py-4">
        <h1 className="font-iranyekan_bold text-2xl">{title}</h1>
        <div className="mt-2 h-[2.5px] w-[7rem] bg-g1_5"></div>
      </div>
      <Slider products={products} bg_color="bg-white" />
    </div>
  );
};

export default Smilar_product_sliderContent;
