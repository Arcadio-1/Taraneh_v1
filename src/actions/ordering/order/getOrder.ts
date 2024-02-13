"use server";

import { prisma } from "@/lib/db/prisma";
import { Order } from "@prisma/client";

type TGetOrder =
  | {
      status: "Success";
      ok: true;
      message: string;
      order: Order;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      order: null;
    };
export const getOrder = async (order_id: string): Promise<TGetOrder> => {
  try {
    const order = await prisma.order.findUnique({ where: { id: order_id } });
    if (!order) {
      throw new Error("سفارش مورد نظر یافت نشد");
    }
    return {
      message: "اطلاعات سفارش دریافت شد",
      ok: true,
      status: "Success",
      order: order,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        order: null,
        status: "Error",
      };
    }
    return {
      message: "خطا در دریافت سفارش",
      ok: false,
      order: null,
      status: "Error",
    };
  }
};
