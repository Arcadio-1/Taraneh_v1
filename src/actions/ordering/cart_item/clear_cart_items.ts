"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/db/prisma";
import { IResponse } from "@/types_validation/type";

export const clear_cart_items = async (cart_id: string): Promise<IResponse> => {
  try {
    const request = await prisma.cartItem.deleteMany({
      where: { cartId: cart_id },
    });
    if (!request) {
      throw new Error("خطا در پاکسازی سبد خرید");
    }
    revalidatePath(`/checkout`);
    return {
      message: "پاکسازی سبد خرید با موفقیت انجام شد",
      ok: true,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        status: "Error",
      };
    }
    return {
      message: "خطا در پاکسازی سبد خرید",
      ok: false,
      status: "Error",
    };
  }
};
