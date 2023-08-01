import { Prisma } from "@prisma/client";

export type AdWithProductWithStatistics = Prisma.AdGetPayload<{
  include: {
    product: { include: { statisctics: true } };
  };
}>;

export type ProductWithStatistics = Prisma.ProductGetPayload<{
  include: { statisctics: true };
}>;
