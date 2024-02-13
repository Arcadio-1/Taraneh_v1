"use server";

import { authOptions } from "@/lib/auth/authOptions";
import { ShoppingCart } from "@/types_validation/type";
import { Cart } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/db/prisma";
import setLocalCartId from "./functions/setLocalCartId";

type TresponseCreateShoppingCart =
  | {
      status: "Success";
      ok: true;
      message: string;
      shoppingCart: ShoppingCart;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      shoppingCart: null;
    };

export async function createCart(): Promise<TresponseCreateShoppingCart> {
  try {
    const session = await getServerSession(authOptions);
    const requestCreateCart = session
      ? await createCart_permanent(session.user.id)
      : await createCart_temp();

    if (!requestCreateCart.ok) {
      throw new Error(requestCreateCart.message);
    }
    return {
      message: requestCreateCart.message,
      ok: requestCreateCart.ok,
      status: requestCreateCart.status,
      shoppingCart: {
        ...requestCreateCart.cart,
        items: [],
        subtotal: 0,
        subTotalWithDiscount: 0,
        size: 0,
        subDiscount: 0,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        message: error.message,
        ok: false,
        shoppingCart: null,
      };
    }
    return {
      status: "Error",
      message: "خطا در ایجاد سبد خرید",
      ok: false,
      shoppingCart: null,
    };
  }
}

type TCreateCart =
  | {
      status: "Success";
      ok: true;
      message: string;
      cart: Cart;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      cart: null;
    };

const createCart_temp = async (): Promise<TCreateCart> => {
  try {
    const createCart = await prisma.cart.create({ data: {} });
    if (!createCart) {
      throw new Error("خطا در ایجاد سبد خرید");
    }
    const setLocalCartIdInCookie = setLocalCartId(createCart.id);
    if (!setLocalCartIdInCookie.ok) {
      throw new Error(setLocalCartIdInCookie.message);
    }
    return {
      cart: createCart,
      message: "سبد خرید با موفقیت ایجاد شد",
      ok: true,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        status: "Error",
        cart: null,
      };
    }
    return {
      message: "خطا در ایجاد سبد خرید",
      ok: false,
      status: "Error",
      cart: null,
    };
  }
};

const createCart_permanent = async (userId: string): Promise<TCreateCart> => {
  try {
    const createCart = await prisma.cart.create({ data: { userId: userId } });
    if (!createCart) {
      throw new Error("خطا در ایجاد سبد خرید");
    }
    return {
      cart: createCart,
      message: "سبد خرید با موفقیت ایجاد شد",
      ok: true,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        cart: null,
        status: "Error",
        ok: false,
        message: error.message,
      };
    }
    return {
      cart: null,
      status: "Error",
      ok: false,
      message: "خطا در ایجاد سبد خرید",
    };
  }
};
