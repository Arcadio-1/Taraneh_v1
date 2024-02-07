"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/db/prisma";
import { createCart } from "../cart/createCart";
import { getCart } from "../cart/getCart";
import { IResponse, Operate } from "@/types_validation/type";

export async function manageCartItem(
  productId: string,
  operate: Operate,
): Promise<IResponse> {
  try {
    let cart;
    const requestGetCart = await getCart();

    if (!requestGetCart.ok) {
      throw new Error(requestGetCart.message);
    }

    if (requestGetCart.status === "Success") {
      cart = requestGetCart.shoppingCart;
    }

    if (requestGetCart.status === "NotFound") {
      const requestCreateCart = await createCart();
      if (!requestCreateCart.ok) {
        throw new Error(requestCreateCart.message);
      }

      cart = requestCreateCart.shoppingCart;
    }

    if (!cart) {
      throw new Error("خطا در دریافت و ایجاد سبد خرید");
    }
    const productInCart = cart.items.find(
      (item) => item.productId === productId,
    );
    if (
      !productInCart &&
      (operate === Operate.decrement || operate === Operate.remove)
    ) {
      throw new Error("این محصول در سبد وجود ندارد");
    }
    let message = "";
    switch (operate) {
      case Operate.decrement: {
        if (productInCart!.quantity === 1) {
          await prisma.cart.update({
            where: { id: cart.id },
            data: { items: { delete: { id: productInCart!.id } } },
          });
          message = "از سبد خرید حذف شد";
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
          message = "تعداد مورد نظر کاهش یافت";
        }
        break;
      }
      case Operate.remove: {
        await prisma.cart.update({
          where: { id: cart.id },
          data: { items: { delete: { id: productInCart!.id } } },
        });
        message = "از سبد خرید حذف شد";
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
          message = "تعداد مورد نظر افزایش یافت";
        } else {
          await prisma.cart.update({
            where: { id: cart.id },
            data: { items: { create: { productId, quantity: 1 } } },
          });
          message = "به سبد خرید اضافه شد";
        }
        break;
      }
    }
    revalidatePath(`/products/${productId}`);
    revalidatePath(`/checkout`);
    // revalidatePath(`/shipping`);
    // revalidatePath(`/payment`);

    return {
      status: "Success",
      ok: true,
      message: message,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "خطا در ویرایش سبد خرید",
    };
  }
}
