import React from "react";
import { Tabel } from "./component/tabel";
import { prisma } from "@/lib/db/prisma";
import { Product_Full } from "@/types_validation/type";

export const Products = async () => {
  const products: Product_Full[] = await prisma.product.findMany({
    include: {
      Product_description: true,
      brand: true,
      specific_cat: true,
      Specifications: true,
      main_cat: true,
    },
  });
  return (
    <div>
      {products.length ? (
        <Tabel products={products} />
      ) : (
        <h1>خطا در دریافت لیست محصولات</h1>
      )}
    </div>
  );
};
