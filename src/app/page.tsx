import { prisma } from "@/lib/db/prisma";
import { price_format } from "@/lib/util/price_formt";
import {
  AdWithProductWithStatistics,
  ProductWithStatistics,
} from "@/types/type";
import { Prisma } from "@prisma/client";

export default async function Home() {
  const statistics: AdWithProductWithStatistics[] = await prisma.ad.findMany({
    include: { product: { include: { statisctics: true } } },
  });
  // const products = await prisma.products.findMany({
  //   orderBy: { id: "desc" },
  // });
  const products_ad: ProductWithStatistics[] = await prisma.product.findMany({
    include: {
      statisctics: true,
    },
  });
  console.log(statistics);
  console.log(products_ad);
  return (
    <div>
      {statistics.map((product, index) => {
        return (
          <div key={product.id}>
            <h1>{product.product.statisctics.soled}</h1>
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
