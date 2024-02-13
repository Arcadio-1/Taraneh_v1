"use server";
import { prisma } from "@/lib/db/prisma";
import { OrderType } from "@/types_validation/type";
import { OrderScheme } from "@/types_validation/validation";

type TCreateOrder =
  | {
      status: "Success";
      ok: true;
      message: string;
      orderId: string;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      orderId: null;
    };

export const createOrder = async (
  orderData: OrderType,
): Promise<TCreateOrder> => {
  try {
    const isValid = OrderScheme.safeParse(orderData);
    if (!isValid.success) {
      throw new Error(isValid.error.message);
    }
    const request = await prisma.order.create({ data: { ...orderData } });
    request.id;
    return {
      status: "Success",
      ok: true,
      message: "سفارش شما با موفقیت ثبت شد",
      orderId: request.id,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
        orderId: null,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "خطا در ثبت سفارش",
      orderId: null,
    };
  }
};
