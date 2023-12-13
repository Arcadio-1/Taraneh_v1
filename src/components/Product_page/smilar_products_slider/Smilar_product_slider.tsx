import React from "react";
import Slider from "@/components/Util/products_Slider/Products_Slider";
import { AdWithProducts } from "@/types/type";
import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";

const Smilar_product_slider = async () => {
  const adProducts: AdWithProducts[] = await prisma.ad.findMany({
    take: 12,
    where: { product: { status: true } },
    select: { product: true },
  });
  const products: Product[] = adProducts.map((product) => {
    return product.product;
  });
  return (
    <div className="border rounded-lg">
      <div className="px-5 py-4">
        <h1 className="text-2xl font-iranyekan_bold">کالاهای مشابه</h1>
        <div className="w-[7rem] h-[2.5px] mt-2 bg-g1_5"></div>
      </div>
      <Slider products={products} bg_color="bg-white" />
    </div>
  );
};

export default Smilar_product_slider;
