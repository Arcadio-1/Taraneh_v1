import Filters from "@/components/Pages/Search_page/filters/Filters";
import Sort from "@/components/Pages/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { QueryParameters, getProducts } from "@/util_functions/getPropducts";
import { MainCatsWithSpecificCats, SortValue } from "@/types_validation/type";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Content from "@/components/Pages/Search_page/content/Content";
import Filters_Sheet from "@/components/Pages/Search_page/filters/Filters_Sheet";
import { Test } from "./test";
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
const getData = async ({
  query_parameters,
}: {
  query_parameters: QueryParameters;
}) => {
  await getProducts(query_parameters);
  // const response = await fetch("/api/products");
  const data = await getProducts(query_parameters);
  console.log(data);
  // console.log(res);
};
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
  const d = await getData({ query_parameters });
  console.log(d);

  return (
    <div className="mt-3 flex items-stretch">
      {/* <button onClick={}>XXXXXXXXXXXXXXXX</button> */}
      <Test query_parameters={query_parameters} />
      <aside className="hidden w-[28rem] rounded-xl border-2 border-dark_6 border-opacity-40 px-5 py-3 text-dark_4 md:block">
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
      <main className=" mb-10 w-full px-2 sm:px-4">
        <div className="flex items-center gap-2">
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
