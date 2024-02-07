import { prisma } from "../../lib/db/prisma";

export const get_product_interduction = async (product_id: string) => {
  try {
    const interduction = await prisma.product_description.findUnique({
      where: { product_id: product_id },
      select: { description: true },
    });
    return interduction;
  } catch (error) {
    console.log(error);
    return null;
  }
};
