import { prisma } from "../db/prisma";

export const get_product_interduction = async (product_id: string) => {
  const interduction = await prisma.product_description.findUnique({
    where: { product_id: product_id },
    select: { description: true },
  });
  return interduction;
};
