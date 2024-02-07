"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/db/prisma";
import {
  CartWithCartItemWithProducts,
  ShoppingCart,
} from "@/types_validation/type";
import { price_calculator } from "../../../util_functions/price_formt";
import getLocalCartId from "./functions/getLocalCartId";
import deleteLocalCartId from "./functions/deleteLocalCartId";

export type IResponseGetCat =
  | {
      status: "Success";
      ok: true;
      message: string;
      shoppingCart: ShoppingCart;
    }
  | {
      status: "NotFound";
      ok: true;
      message: string;
      shoppingCart: null;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      shoppingCart: null;
    };

export async function getCart(): Promise<IResponseGetCat> {
  try {
    const session = await getServerSession(authOptions);
    const requestGetCart = session
      ? await getPermanentCart(session.user.id)
      : await getTempCart();
    if (!requestGetCart.ok) {
      throw new Error(requestGetCart.message);
    }
    if (requestGetCart.status === "NotFound") {
      return {
        status: "NotFound",
        ok: true,
        message: requestGetCart.message,
        shoppingCart: null,
      };
    }
    const { cart } = requestGetCart;
    return {
      status: "Success",
      ok: true,
      shoppingCart: {
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
            item.quantity *
              (item.product.price / 100) *
              item.product.off_percent,
          0,
        ),
      },
      message: "دریافت سبد خرید با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
        shoppingCart: null,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "خطا در دریافت سبد خرید  x",
      shoppingCart: null,
    };
  }
}

type IResponseGetTempCart =
  | {
      status: "Success";
      ok: true;
      message: string;
      cart: CartWithCartItemWithProducts;
    }
  | {
      status: "NotFound";
      ok: true;
      message: string;
      cart: null;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      cart: null;
    };

const getTempCart = async (): Promise<IResponseGetTempCart> => {
  try {
    const requestGetLocalCartId = getLocalCartId();
    if (!requestGetLocalCartId.ok) {
      return {
        status: "NotFound",
        message: "سبد خرید یافت نشد",
        ok: true,
        cart: null,
      };
    }
    const request = await prisma.cart.findUnique({
      where: { id: requestGetLocalCartId.cartId },
      include: { items: { include: { product: true } } },
    });
    if (!request) {
      deleteLocalCartId();
      throw new Error("خطا در دریافت سبد خرید موقت");
    }
    return {
      message: "سبد خرید موقت با موفقیت دریافت شد",
      ok: true,
      cart: request,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
        cart: null,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "سبد خرید یافت نشد",
      cart: null,
    };
  }
};
const getPermanentCart = async (
  userId: string,
): Promise<IResponseGetTempCart> => {
  try {
    const request = await prisma.cart.findFirst({
      where: { userId: userId },
      include: { items: { include: { product: true } } },
    });
    if (!request) {
      return {
        status: "NotFound",
        ok: true,
        message: "سبد خرید یافت نشد",
        cart: null,
      };
    }
    return {
      message: "سبد خرید دائمی  با موفقیت دریافت شد",
      ok: true,
      cart: request,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
        cart: null,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "سبد خرید دائمی یافت نشد",
      cart: null,
    };
  }
};
