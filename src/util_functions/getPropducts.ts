"use server";

import { ProductsWithBrands } from "@/types_validation/type";
import { prisma } from "../lib/db/prisma";
import { Main_cat, Specific_cat } from "@prisma/client";
// import { SortValue } from "@/components/Search_page/sorts/Sort";
// import { SortValue } from "@/components/Search_page/sorts/Sort";

enum SortValue {
  grtPrice = "0",
  lwrPrice = "1",
  grtView = "2",
  grtSale = "3",
  fav = "4",
  newst = "5",
}
export interface QueryParameters {
  page: string;
  sort: SortValue;
  searchQuery: string;
  pageSize: number;
  bQ: string[];
  maxPrice: string;
  minPrice: string;
  main_cat: string;
  specific_cat: string;
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
  maxPrice = "",
  minPrice = "",
  pageSize,
  bQ,
  main_cat = "",
  specific_cat = "",
}: QueryParameters): Promise<GetProductReturnType> => {
  const currentPage = parseInt(page);
  const totalPages = await getTtotalPages(
    searchQuery,
    bQ,
    maxPrice,
    minPrice,
    pageSize,
    main_cat,
    specific_cat,
  );

  let products: ProductsWithBrands[] = [];
  switch (sort) {
    case SortValue.grtPrice:
      products = await prisma.product.findMany({
        where: {
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
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
          AND: [
            main_cat ? { main_cat: { label: `${main_cat}` } } : {},
            specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
            searchQuery
              ? {
                  OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    {
                      brand: {
                        title_fr: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                        title_en: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    },
                  ],
                }
              : {},
            bQ.length ? { brand: { title_en: { in: bQ } } } : {},
            maxPrice && minPrice
              ? {
                  AND: [
                    { price: { gt: Number(minPrice) } },
                    { price: { lt: Number(maxPrice) } },
                  ],
                }
              : {},
          ],
        },
        include: { brand: true },
        orderBy: { createdAt: "desc" },
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
  bQ: string[],
  maxPrice: string,
  minPrice: string,
  pageSize: number,
  main_cat = "",
  specific_cat = "",
): Promise<number> => {
  let totalItemCount = 0;

  totalItemCount = await prisma.product.count({
    where: {
      AND: [
        main_cat ? { main_cat: { label: `${main_cat}` } } : {},
        specific_cat ? { specific_cat: { label: `${specific_cat}` } } : {},
        searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery, mode: "insensitive" } },
                {
                  brand: {
                    title_fr: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                    title_en: {
                      contains: searchQuery,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {},
        bQ.length ? { brand: { title_en: { in: bQ } } } : {},
        maxPrice && minPrice
          ? {
              AND: [
                { price: { gt: Number(minPrice) } },
                { price: { lt: Number(maxPrice) } },
              ],
            }
          : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return totalPages;
};
