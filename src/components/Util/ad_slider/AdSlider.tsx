import { prisma } from "@/lib/db/prisma";
import { AdWithProducts } from "@/types_validation/type";
import React from "react";
import Slider from "../products_Slider/Products_Slider";
import { Product } from "@prisma/client";
import { Hero_slide_type } from "../products_Slider/hero_slide";

const AdSlider = async () => {
  const adProducts = await prisma.product.findMany({
    take: 8,
    where: {
      status: true,
      off_percent: { gt: 1 },
    },
  });

  const products: Product[] = adProducts.map((product) => {
    return product;
  });

  const heroSlide: Hero_slide_type = {
    image_url: "/image/assets/ad_slide_hero_v1.png",
    link_url: "#",
  };
  return (
    <div className="z-0 overflow-auto">
      <Slider products={products} bg_color="bg-g3_3" heroSlide={heroSlide} />
    </div>
  );
};

export default AdSlider;
