"use server";
import { prisma } from "@/lib/db/prisma";
import { IResponse } from "@/types_validation/type";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const cancelOrder = async (order_id: string): Promise<IResponse> => {
  try {
    await prisma.order.update({
      where: { id: order_id },
      data: { status: OrderStatus.CANCELED },
    });
    revalidatePath(`/profile/orders`);
    return {
      message: "سفارش با موفقیت لغو شد",
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
      message: "بروز خطا در لغو سفارش",
      ok: false,
      status: "Error",
    };
  }
};
