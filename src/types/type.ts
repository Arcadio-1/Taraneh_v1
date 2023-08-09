import { Prisma } from "@prisma/client";

export type AdWithProducts = Prisma.AdGetPayload<{
  select: {
    product: true;
  };
}>;

export type Specfic_cat = Prisma.Main_catGetPayload<{
  select: {
    Specific_cat: true;
    id: true;
    label: true;
    title: true;
    image: true;
  };
}>;

export type AllCatsTopsViewProducts = Prisma.ProductGetPayload<{
  include: { main_cat: true };
}>[];
