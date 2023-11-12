import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats, ProductsWithBrands } from "@/types/type";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SearchPageProps {
  searchParams: { query: string; page: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `${
      query ? `جستجو: ${query} - کافه ترانه` : "لیست محصولات - کافه ترانه"
    }`,
  };
}

const All_products_page = async ({
  searchParams: { page = "1", query },
}: SearchPageProps) => {
  const currentPage = parseInt(page);

  const pageSize = 8;
  const heroItemCount = 0;

  let totalItemCount: number = 0;

  let products: ProductsWithBrands[] = [];

  if (!query) {
    totalItemCount = await prisma.product.count();
    products = await prisma.product.findMany({
      include: { brand: true },
      orderBy: { id: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
  }
  if (query) {
    totalItemCount = await prisma.product.count({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          {
            brand: {
              title_fr: { contains: query, mode: "insensitive" },
              title_en: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
    });

    products = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          {
            brand: {
              title_fr: { contains: query, mode: "insensitive" },
              title_en: { contains: query, mode: "insensitive" },
            },
          },
        ],
      },
      include: { brand: true },
      orderBy: { id: "desc" },
      take: pageSize,
    });
  }
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const allBrands = await prisma.brand.findMany();
  const mainCats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  // console.log(query);
  return (
    <div className="flex items-stretch mt-3">
      <aside className="hidden lg:block border-2 w-[25rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
        <Filters brands={allBrands} mainCats={mainCats} />
      </aside>
      <main className=" w-full px-4 mb-10">
        <Sort />
        <Products products={products} />
        <PageinationBar
          query={query}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default All_products_page;
