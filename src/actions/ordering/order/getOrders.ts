"use server";

import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";

export type TGetOrders =
  | {
      status: "Success";
      ok: true;
      message: string;
      orders: Order[];
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      orders: [];
    };
export const getOrders = async (): Promise<TGetOrders> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا به حساب کاربری خود وارد شوید");
    }
    const orders = await prisma.order.findMany({
      where: { user_id: session.user.id },
    });
    if (!orders) {
      throw new Error("سفارش مورد نظر یافت نشد");
    }
    return {
      message: "اطلاعات سفارش دریافت شد",
      ok: true,
      status: "Success",
      orders: orders,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        orders: [],
        status: "Error",
      };
    }
    return {
      message: "خطا در دریافت سفارش",
      ok: false,
      orders: [],
      status: "Error",
    };
  }
};
