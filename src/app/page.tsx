import AdSlider from "@/components/AdSlider/AdSlider";
import Hero from "@/components/hero/Hero";
import { prisma } from "@/lib/db/prisma";
import { price_format } from "@/lib/util/price_formt";
import { Prisma } from "@prisma/client";
import { Fragment } from "react";

export default async function Home() {
  // const statistics: AdWithProductWithStatistics[] = await prisma.ad.findMany({
  //   include: { product: { include: { statisctics: true } } },
  // });
  // const products = await prisma.products.findMany({
  //   orderBy: { id: "desc" },
  // });
  // const products_ad: ProductWithStatistics[] = await prisma.product.findMany({
  //   include: {
  //     statisctics: true,
  //   },
  // });
  // console.log(statistics);
  // console.log(products_ad);
  return (
    <Fragment>
      <Hero />
      <AdSlider />
    </Fragment>
  );
}
