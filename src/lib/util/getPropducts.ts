"use server";

import { ProductsWithBrands } from "@/types/type";
import { prisma } from "../db/prisma";
import { SortValue } from "@/components/Search_page/sorts/Sort";

export interface GetProductsInterface {
  page: string;
  sort: SortValue;
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
  sort = SortValue.newst,
  searchQuery = "",
  pageSize,
}: GetProductsInterface): Promise<GetProductReturnType> => {
  const currentPage = parseInt(page);
  const totalPages = await getTtotalPages(searchQuery, pageSize);

  let products: ProductsWithBrands[] = [];

  if (!searchQuery) {
    switch (sort) {
      case SortValue.grtPrice:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { price: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.lwrPrice:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { price: "asc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.grtView:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { statistics: { views: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.grtSale:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { statistics: { soled: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.fav:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { statistics: { totalLike: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.newst:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      default:
        products = await prisma.product.findMany({
          include: { brand: true },
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
    }
  }

  if (searchQuery) {
    switch (sort) {
      case SortValue.grtPrice:
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
          orderBy: { price: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.lwrPrice:
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
        break;
      case SortValue.grtView:
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
          orderBy: { statistics: { views: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.grtSale:
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
          orderBy: { statistics: { soled: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.fav:
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
          orderBy: { statistics: { totalLike: "desc" } },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      case SortValue.newst:
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
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        break;
      default:
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
          orderBy: { createdAt: "desc" },
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
    }
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
