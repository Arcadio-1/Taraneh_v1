import { Prisma } from "@prisma/client";

export type AdWithProducts = Prisma.AdGetPayload<{
  select: {
    product: true;
  };
}>;
export type DrinksBrands = Prisma.ProductGetPayload<{
  select: {
    brand: true;
  };
}>;

export type MainCat_with_Specific_cats = Prisma.Main_catGetPayload<{
  include: { Specific_cat: true };
}>;

export type AllCatsTopsViewProducts = Prisma.ProductGetPayload<{
  include: { main_cat: true };
}>[];
