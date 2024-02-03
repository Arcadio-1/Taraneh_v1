import React from "react";
import Slider from "@/components/Util/components/products_Slider/Products_Slider";
import { Hero_slide_type } from "../products_Slider/hero_slide";
import { prisma } from "@/lib/db/prisma";

const AdsliderContent = async () => {
  const adProducts = await prisma.product.findMany({
    take: 8,
    where: {
      status: true,
      off_percent: { gt: 1 },
    },
  });
  const heroSlide: Hero_slide_type = {
    image_url: "/image/assets/ad_slide_hero_v1.png",
    link_url: "#",
  };
  return (
    <Slider products={adProducts} bg_color="bg-g3_3" heroSlide={heroSlide} />
  );
};

export default AdsliderContent;
