import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort, { SortValue } from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { GetProductsInterface, getProducts } from "@/lib/util/getPropducts";
import { MainCatsWithSpecificCats } from "@/types/type";
import { Metadata } from "next";
import React from "react";

interface SearchPageProps {
  searchParams: { searchQuery: string; page: string; sort: SortValue };
}

export function generateMetadata({
  searchParams: { searchQuery },
}: SearchPageProps): Metadata {
  return {
    title: `${
      searchQuery
        ? `جستجو: ${searchQuery} - کافه ترانه`
        : "لیست محصولات - کافه ترانه"
    }`,
  };
}

const All_products_page = async ({
  searchParams: { page, searchQuery, sort },
}: SearchPageProps) => {
  const geting: GetProductsInterface = {
    searchQuery: searchQuery,
    page: page,
    sort: sort,
    pageSize: 8,
  };
  const { currentPage, products, totalPages } = await getProducts(geting);

  const allBrands = await prisma.brand.findMany();
  const mainCats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="flex items-stretch mt-3">
      <aside className="hidden lg:block border-2 w-[25rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
        <Filters brands={allBrands} mainCats={mainCats} />
      </aside>
      <main className=" w-full px-4 mb-10">
        <Sort searchQuery={searchQuery} />
        <Products products={products} />
        <PageinationBar
          sort={sort}
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default All_products_page;
