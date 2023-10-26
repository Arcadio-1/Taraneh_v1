"use server";

import { Order } from "@prisma/client";
import { prisma } from "../db/prisma";
import { OrderType } from "@/types/type";

export const addOrder = async (orderest: OrderType) => {
  await prisma.order.create({
    data: { ...orderest },
  });
};
export const getOrders = async (userId: string) => {
  const orders: Order[] | null = await prisma.order.findMany({
    where: { user_id: userId },
  });
  return orders;
};
