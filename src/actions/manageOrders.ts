"use server";

import { Order, OrderStatus } from "@prisma/client";
import { prisma } from "../lib/db/prisma";
import { OrderType } from "@/types_validation/type";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth/authOptions";

export const addOrder = async (orderest: OrderType) => {
  const orderAdder = await prisma.order.create({
    data: { ...orderest },
  });
  return orderAdder;
};
export const getOrders = async (): Promise<Order[] | null> => {
  const session = await getServerSession(authOptions);
  if (session) {
    const orders: Order[] | null = await prisma.order.findMany({
      where: { user_id: session.user.id },
    });
    return orders;
  }
  return null;
};

export const cancelOrder = async (id: string) => {
  const canceling = await prisma.order.update({
    where: { id: id },
    data: { status: OrderStatus.CANCELED },
  });
  // revalidatePath(`/`);
  revalidatePath(`/profile/orders`);
  // revalidatePath(`/profile/order/${id}`);
  return canceling;
};
