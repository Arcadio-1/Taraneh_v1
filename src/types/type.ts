import { Prisma } from "@prisma/client";

export type AdWithProducts = Prisma.AdGetPayload<{
  include: {
    product: true;
  };
}>;

export type Specfic_cat = Prisma.Main_catGetPayload<{
  select: { Specific_cat: true; id: true; label: true; title: true };
}>;
