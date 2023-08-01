import { Prisma } from "@prisma/client";

export type AdWithProductsAndProduct_statistics = Prisma.product_adGetPayload<{
  include: {
    product: {
      include: { product_statistics: true };
    };
  };
}>;

export type ProductWithStatistics = Prisma.productsGetPayload<{
  include: { product_statistics: true };
}>;
