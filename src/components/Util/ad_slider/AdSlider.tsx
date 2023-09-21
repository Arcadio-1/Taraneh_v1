import { prisma } from "@/lib/db/prisma";
import { AdWithProducts } from "@/types/type";
import React from "react";
import Slider from "../products_Slider/Products_Slider";
import { Product } from "@prisma/client";
import { Hero_slide_type } from "../products_Slider/hero_slide";

const AdSlider = async () => {
  const adProducts: AdWithProducts[] = await prisma.ad.findMany({
    take: 8,
    where: { product: { status: true } },
    select: { product: true },
  });

  const products: Product[] = adProducts.map((product) => {
    return product.product;
  });

  // Use this to save cart id in cookies for unauthenticated users
  // const secretPass = "123";
  // const text = { user_id: "hossein", use_name: "c4net" };
  // const data = CryptoJS.AES.encrypt(JSON.stringify(text), "123").toString();

  // const bytes = CryptoJS.AES.decrypt(data, "123");
  // const data2 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const heroSlide: Hero_slide_type = {
    image_url: "/image/assets/ad_slide_hero_v1.png",
    title: "پیشنهاد شگفت انگیز",
    link_url: "#",
  };
  return (
    <div className="">
      <Slider products={products} bg_color="bg-g3_3" heroSlide={heroSlide} />
    </div>
  );
};

export default AdSlider;
