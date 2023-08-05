import { Prisma } from "@prisma/client";

export type AdWithProducts = Prisma.AdGetPayload<{
  include: {
    product: true;
  };
}>;
