"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db/prisma";
import { createCart } from "./createCart";
import { getCart } from "./getCart";
import { Operate } from "@/types_validation/type";

export async function manageCartItem(
  productId: string,
  operate: Operate,
): Promise<void> {
  const cart = (await getCart()) ?? (await createCart());
  const productInCart = cart.items.find((item) => item.productId === productId);
  if (
    !productInCart &&
    (operate === Operate.decrement || operate === Operate.remove)
  ) {
    throw new Error("این محصول در سبد وجود ندارد");
  }
  switch (operate) {
    case Operate.decrement: {
      if (productInCart!.quantity === 1) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { items: { delete: { id: productInCart!.id } } },
        });
      } else {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              update: {
                where: { id: productInCart!.id },
                data: { quantity: { decrement: 1 } },
              },
            },
          },
        });
      }
      break;
    }
    case Operate.remove: {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { items: { delete: { id: productInCart!.id } } },
      });
      break;
    }
    case Operate.increment: {
      if (productInCart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              update: {
                where: { id: productInCart.id },
                data: { quantity: { increment: 1 } },
              },
            },
          },
        });
      } else {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { items: { create: { productId, quantity: 1 } } },
        });
      }
      break;
    }
  }
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/checkout`);
  // revalidatePath(`/shipping`);
  // revalidatePath(`/payment`);
}
