"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db/prisma";
import { createCart } from "./createCart";
import { getCart } from "./getCart";
import { Operate } from "@/types_validation/type";

export async function manageCart(
  productId: string,
  operate: Operate,
): Promise<void> {
  const cart = (await getCart()) ?? (await createCart());
  const productInCart = cart.items.find((item) => item.productId === productId);

  if (operate === Operate.decrement) {
    if (productInCart) {
      if (productInCart.quantity === 1) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { items: { delete: { id: productInCart?.id } } },
        });
      } else {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              update: {
                where: { id: productInCart.id },
                data: { quantity: { decrement: 1 } },
              },
            },
          },
        });
      }
    }
  }
  if (operate === Operate.remove) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: { items: { delete: { id: productInCart?.id } } },
    });
  }
  if (operate === Operate.increment) {
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
  }
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/checkout`);
  // revalidatePath(`/shipping`);
  // revalidatePath(`/payment`);
}

export async function resetCart(cart_id: string) {
  await prisma.cart.delete({
    where: { id: cart_id },
  });
  revalidatePath(`/`);
  revalidatePath(`/checkout`);
}
