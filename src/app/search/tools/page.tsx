import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import {
  Drinks_products,
  MainCatsWithSpecificCats,
  ProductsWithBrands,
} from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  searchParams: { searchQuery: string; page: string; sort: string };
}
const Drinks_page = async ({
  searchParams: { page = "1", searchQuery },
}: Props) => {
  const allProducts = await prisma.product.findMany({
    where: { main_cat: { label: "tools" } },
    include: { brand: true },
  });
  const currentPage = parseInt(page);

  const pageSize = 10;
  const heroItemCount = 1;

  const totalItemCount = allProducts.length;

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products: ProductsWithBrands[] = await prisma.product.findMany({
    where: { main_cat: { label: "tools" } },
    include: { brand: true },
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize + 1,
    take: pageSize,
  });
  const brands = allProducts.map((product) => product.brand);

  const arrayUniqueByKey = [
    ...new Map(brands.map((item) => [item.id, item])).values(),
  ];

  const mainCats = await prisma.main_cat.findFirst({
    where: { label: "tools" },
    select: { Specific_cat: true },
  });

  return (
    <div className="flex items-stretch mt-3">
      <aside className="hidden lg:block border-2 w-[25rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
        <Filters
          brands={arrayUniqueByKey}
          specificCats={mainCats?.Specific_cat}
        />
      </aside>
      <main className=" w-full px-4 mb-10">
        <div className="flex gap-2">
          {mainCats?.Specific_cat.map((main) => {
            return (
              <Link
                href={`/search/${main.label}`}
                key={main.id}
                className="flex flex-col justify-evenly items-center border border-g1_7 h-48 w-48 rounded-xl border-opacity-25"
              >
                <span className=" text-lg">{main.title}</span>
                <Image
                  src={main.single_image}
                  alt={main.label}
                  width={70}
                  height={70}
                />
              </Link>
            );
          })}
        </div>
        <Sort />
        <Products products={products} />
        <PageinationBar
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default Drinks_page;
