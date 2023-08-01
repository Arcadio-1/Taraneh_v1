import { prisma } from "@/lib/db/prisma";
import { price_format } from "@/lib/util/price_formt";
import { AdWithProductsAndProduct_statistics } from "@/types/type";
import { Prisma, products, product_ad } from "@prisma/client";

type AdWithProducts = Prisma.product_adGetPayload<{
  include: {};
}>;
export default async function Home() {
  const statistics = await prisma.product_ad.findMany({
    include: {
      product: {
        include: { statisctics: true },
      },
    },
  });
  // const products = await prisma.products.findMany({
  //   orderBy: { id: "desc" },
  // });
  // const products_ad = await prisma.product_statistics.findMany({
  //   include: {
  //     product: { include: { product_statistics: { select: { soled: true } } } },
  //   },
  // });
  console.log(statistics);
  return (
    <div>
      {statistics.map((product, index) => {
        return (
          <div key={product.id}>
            <h1>{product.product.statisctics.totalRate}</h1>
            {/* <h1>{product.product.product_statistics}</h1> */}
            {/* <h1 className="text-red-300">
              {
                price_format(product.product.price, product.product.off_percent)
                  .price
              }
            </h1> */}
            {/* <h1 className="text-green-600 font-bold">
              {
                price_format(product.product.price, product.product.off_percent)
                  .off_price
              }
            </h1> */}
          </div>
        );
      })}
    </div>
  );
}
