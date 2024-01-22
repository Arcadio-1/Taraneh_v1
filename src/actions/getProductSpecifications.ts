import { prisma } from "../lib/db/prisma";

export const get_propsduct_specifications = async (product_id: string) => {
  const specifications = await prisma.specifications.findUnique({
    where: { product_id: product_id },
    select: { specifications: true },
  });
  return specifications;
};
