"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../lib/db/prisma";
import { CartWithProducts, ShoppingCart } from "@/types_validation/type";
import { cookies } from "next/headers";
import { AES, enc } from "crypto-js";
import { env } from "../types_validation/env";
import { price_calculator } from "../util_functions/price_formt";

export async function getCart(): Promise<ShoppingCart | null> {
  // console.log("run");
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCartIdCooki = cookies().get("localCartId")?.value;
    const localCartId =
      localCartIdCooki &&
      AES.decrypt(localCartIdCooki, env.CRYPT_SECRET).toString(enc.Utf8);

    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }
  if (!cart) {
    return null;
  }
  // console.log(cart.items);
  console.log(cart.items.length);
  if (!!!cart.items.length) {
    console.log(cart.items);
    console.log(cart.id);
    await deleteCart(cart.id);
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subTotalWithDiscount: cart.items.reduce(
      (acc, item) =>
        acc +
        item.quantity *
          price_calculator(item.product.price, item.product.off_percent),
      0,
    ),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
    subDiscount: cart.items.reduce(
      (acc, item) =>
        acc +
        item.quantity * (item.product.price / 100) * item.product.off_percent,
      0,
    ),
  };
}
const deleteCart = async (cart_id: string) => {
  console.log("run");
  try {
    const request = await prisma.cart.delete({
      where: { id: cart_id },
    });
    console.log(request);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log(error);
  }
};
