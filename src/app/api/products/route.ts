import { prisma } from "@/lib/db/prisma";
import React from "react";

export const Get = async (request: Request) => {
  console.log(request);
  const products = await prisma.product.findMany();
  return Response.json({ data: products });
};
