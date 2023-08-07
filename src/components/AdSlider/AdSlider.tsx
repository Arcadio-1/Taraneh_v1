import { prisma } from "@/lib/db/prisma";
import { AdWithProducts, Specfic_cat } from "@/types/type";
import React from "react";
import Slider from "./Slider";
import CryptoJS from "crypto-js";
import { Main_cat, Prisma, Specific_cat } from "@prisma/client";
import Link from "next/link";

const AdSlider = async () => {
  const adProducts: AdWithProducts[] = await prisma.ad.findMany({
    include: { product: true },
  });

  // Use this to save cart id in cookies for unauthenticated users
  // const secretPass = "123";
  // const text = { user_id: "hossein", use_name: "c4net" };
  // const data = CryptoJS.AES.encrypt(JSON.stringify(text), "123").toString();

  // const bytes = CryptoJS.AES.decrypt(data, "123");
  // const data2 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // console.log(data2);
  return (
    <div className="px-2 py-5">
      <Slider products={adProducts} />
    </div>
  );
};

export default AdSlider;
