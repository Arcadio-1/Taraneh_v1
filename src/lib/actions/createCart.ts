"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ShoppingCart } from "@/types/type";
import { Cart } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "../db/prisma";
import { cookies } from "next/headers";

import { AES, enc } from "crypto-js";
import { env } from "@/lib/env";

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);
  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    const cipherText = AES.encrypt(newCart.id, env.CRYPT_SECRET);
    const encripted = cipherText.toString();

    cookies().set("localCartId", encripted);
    // const bytes =
    //   test && AES.decrypt(test, env.CRYPT_SECRET).toString(enc.Utf8);
  }
  return {
    ...newCart,
    items: [],
    subtotal: 0,
    subTotalWithDiscount: 0,
    size: 0,
    subDiscount: 0,
  };
}
