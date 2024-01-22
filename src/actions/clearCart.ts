"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db/prisma";

export const clear_cart = async (cart_id: string) => {
  await prisma.cartItem.deleteMany({
    where: { cartId: cart_id },
  });
  revalidatePath(`/checkout`);
};
