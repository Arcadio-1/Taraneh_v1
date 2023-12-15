import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { GetProductsInterface, getProducts } from "@/lib/util/getPropducts";
import { MainCatsWithSpecificCats, SortValue } from "@/types/type";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "../loading";
import FiltersMobile from "@/components/Search_page/filters/FiltersMobile";
import Image from "next/image";
import Notfound_Svg from "@/assets/images/util/not-found.svg";
import InfoIcon from "@/components/Util/icons/InfoIcon";
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
    title: `${
      searchQuery
        ? `جستجو: ${searchQuery} - کافه ترانه`
        : "لیست محصولات - کافه ترانه"
    }`,
  };
}

const All_products_page = async ({
  searchParams: { page, searchQuery, sort, cat, bQ, maxPrice, minPrice },
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
    specific_cat: "",
  };
  const { currentPage, totalPages, products } = await getProducts(queryDetials);

  const allBrands = await prisma.brand.findMany({
    orderBy: { title_fr: "asc" },
  });
  const mainCats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  console.log(totalPages);
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
      <main className=" w-full px-2 sm:px-4 mb-10">
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
          {!!products.length ? (
            <Products products={products} />
          ) : (
            <div className="flex flex-col justify-center items-center gap-6  w-full max-w-2xl mx-auto p-8">
              <Image
                src={Notfound_Svg}
                width={200}
                height={80}
                alt="کالایی با این مشخصات پیدا نکردیم"
              />
              <div className="flex items-start gap-4 py-6 px-4 border rounded-lg grow w-full">
                <InfoIcon classes="w-8 h-8 fill-orange-300" />
                <div className="flex flex-col gap-3">
                  <h1 className="font-iranyekan_bold text-xl">
                    کالایی با این مشخصات پیدا نکردیم
                  </h1>
                  <h2 className="font-iranyekan_bold text-md">
                    پیشنهاد می‌کنیم فیلترها را تغییر دهید
                  </h2>
                </div>
              </div>
            </div>
          )}
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
