import AdSlider from "@/components/Util/ad_slider/AdSlider";
import Hero from "@/components/Home_page/hero/Hero";

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
    <div>
      <Hero />
      <AdSlider />
    </div>
  );
}
