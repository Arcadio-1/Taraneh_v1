"use server";
import { prisma } from "../../lib/db/prisma";

export const get_propsduct_specifications = async (product_id: string) => {
  try {
    const specifications = await prisma.specifications.findUnique({
      where: { product_id: product_id },
      select: { specifications: true },
    });
    return specifications;
  } catch (error) {
    console.log(error);
    return null;
  }
};
