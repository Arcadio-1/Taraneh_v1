import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { GetProductsInterface, getProducts } from "@/lib/util/getPropducts";
import { MainCatsWithSpecificCats, SortValue } from "@/types/type";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "../../loading";
import CartItemSkeleton from "@/components/Profile_page/content/components/Orders/components/orderItem/components/CartItemSkeleton";
import FiltersMobile from "@/components/Search_page/filters/FiltersMobile";
import Not_found from "@/components/Search_page/Products/Not_found";

interface SearchPageProps {
  params: {
    specificLabel: string;
  };
  searchParams: {
    searchQuery: string;
    page: string;
    sort: SortValue;
    cat: string;
    bQ: string;
    minPrice: string;
    maxPrice: string;
  };
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
  searchParams: { page, searchQuery, sort, cat, bQ, maxPrice, minPrice },
  params: { specificLabel },
}: SearchPageProps) => {
  const bQhelper = () => {
    if (typeof bQ === "string") {
      return [`${bQ}`];
    }
    if (typeof bQ === "undefined") {
      return [];
    }
    if (typeof bQ === "object") {
      return [...bQ];
    }
    return [];
  };

  const queryDetials: GetProductsInterface = {
    searchQuery: searchQuery,
    page: page,
    sort: sort,
    pageSize: 8,
    bQ: bQhelper(),
    maxPrice: maxPrice,
    minPrice: minPrice,
    main_cat: "",
    specific_cat: `${specificLabel}`,
  };
  const { currentPage, totalPages, products } = await getProducts(queryDetials);

  const allBrands = await prisma.brand.findMany({
    orderBy: { title_fr: "asc" },
  });
  const mainCats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="flex items-stretch mt-3">
      <aside className="hidden md:block border-2 w-[28rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
        <Filters
          brands={allBrands}
          mainCats={mainCats}
          searchQuery={searchQuery}
          sort={sort}
          bQ={bQhelper()}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
      </aside>
      <main className=" w-full px-4 mb-10">
        <div className="flex gap-2 items-center">
          <FiltersMobile
            brands={allBrands}
            mainCats={mainCats}
            searchQuery={searchQuery}
            sort={sort}
            bQ={bQhelper()}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
          <Sort
            bQ={bQhelper()}
            maxPrice={maxPrice}
            minPrice={minPrice}
            searchQuery={searchQuery}
            sort={sort}
          />
        </div>
        <Suspense fallback={<Loading />}>
          {!!products.length ? <Products products={products} /> : <Not_found />}
        </Suspense>
        {!!totalPages && (
          <PageinationBar
            bQ={bQhelper()}
            sort={sort}
            searchQuery={searchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        )}
      </main>
    </div>
  );
};

export default All_products_page;
