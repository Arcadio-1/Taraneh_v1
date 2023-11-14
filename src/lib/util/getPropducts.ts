"use server";

import { ProductsWithBrands } from "@/types/type";
import { prisma } from "../db/prisma";

export interface GetProductsInterface {
  page: string;
  sort: string;
  searchQuery: string;
  pageSize: number;
}

type GetProductReturnType = {
  products: ProductsWithBrands[] | [];
  currentPage: number;
  totalPages: number;
};

export const getProducts = async ({
  page = "1",
  sort = "",
  searchQuery = "",
  pageSize,
}: GetProductsInterface): Promise<GetProductReturnType> => {
  const currentPage = parseInt(page);
  const totalPages = await getTtotalPages(searchQuery, pageSize);

  let products: ProductsWithBrands[] = [];

  if (!searchQuery) {
    products = await prisma.product.findMany({
      include: { brand: true },
      orderBy: { id: "asc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }

  if (searchQuery) {
    products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          {
            brand: {
              title_fr: { contains: searchQuery, mode: "insensitive" },
              title_en: { contains: searchQuery, mode: "insensitive" },
            },
          },
        ],
      },
      include: { brand: true },
      orderBy: { price: "asc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }

  return {
    currentPage: currentPage,
    products: products,
    totalPages: totalPages,
  };
};

const getTtotalPages = async (
  searchQuery: string,
  pageSize: number
): Promise<number> => {
  let totalItemCount = 0;

  if (!searchQuery) {
    totalItemCount = await prisma.product.count();
  }

  if (searchQuery) {
    totalItemCount = await prisma.product.count({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          {
            brand: {
              title_fr: { contains: searchQuery, mode: "insensitive" },
              title_en: { contains: searchQuery, mode: "insensitive" },
            },
          },
        ],
      },
    });
  }
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return totalPages;
};
