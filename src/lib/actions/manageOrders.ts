"use server";

import { prisma } from "../db/prisma";
import { OrderType } from "@/types/type";

export const addOrder = async (orderest: OrderType) => {
  await prisma.order.create({
    data: { ...orderest },
  });
};
