import { cookies } from "next/headers";
import { prisma } from "../db/prisma";
import { CartItem } from "@prisma/client";
import { AES, enc } from "crypto-js";
import { env } from "../env";

export async function mergeCarts(userId: string): Promise<void> {
  const localCartIdCrypted = cookies().get("localCartId")?.value;
  const localCartId =
    localCartIdCrypted &&
    AES.decrypt(localCartIdCrypted, env.CRYPT_SECRET).toString(enc.Utf8);

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId: userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(userCart.items, localCart.items);

      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });
      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    await tx.cart.delete({ where: { id: localCart.id } });
    cookies().set("localCartId", "");
  });
}

const mergeCartItems = (...cartItems: CartItem[][]): CartItem[] => {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
};
