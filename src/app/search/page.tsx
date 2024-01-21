import Filters from "@/components/Search_page/filters/Filters";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { QueryParameters } from "@/lib/util/getPropducts";
import { MainCatsWithSpecificCats, SortValue } from "@/types/type";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Content from "@/components/Search_page/content/Content";
import Filters_Sheet from "@/components/Search_page/filters/Filters_Sheet";
interface SearchPageProps {
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
    title: `${searchQuery ? `جستجو: ${searchQuery}` : "لیست محصولات"}`,
  };
}

const All_products_page = async ({
  searchParams: { page, searchQuery, sort, cat, bQ, maxPrice, minPrice },
}: SearchPageProps) => {
  const brands_List = (): Array<string> => {
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

  const query_parameters: QueryParameters = {
    searchQuery: searchQuery,
    page: page,
    sort: sort,
    pageSize: 8,
    bQ: brands_List(),
    maxPrice: maxPrice,
    minPrice: minPrice,
    main_cat: "",
    specific_cat: "",
  };

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
          bQ={brands_List()}
          maxPrice={maxPrice}
          minPrice={minPrice}
          page={page}
        />
      </aside>
      <main className=" w-full px-2 sm:px-4 mb-10">
        <div className="flex gap-2 items-center">
          <div className="md:hidden">
            <Filters_Sheet>
              <Filters
                brands={allBrands}
                mainCats={mainCats}
                searchQuery={searchQuery}
                sort={sort}
                bQ={brands_List()}
                maxPrice={maxPrice}
                minPrice={minPrice}
                page={page}
              />
            </Filters_Sheet>
          </div>
          <Sort
            bQ={brands_List()}
            maxPrice={maxPrice}
            minPrice={minPrice}
            searchQuery={searchQuery}
            sort={sort}
          />
        </div>
        <Suspense fallback={<p>Loading Products</p>}>
          <Content query_parameters={query_parameters} />
        </Suspense>
      </main>
    </div>
  );
};

export default All_products_page;
