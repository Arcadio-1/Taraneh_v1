import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats, ProductsWithBrands } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  searchParams: {
    page: string;
  };
}

const All_products_page = async ({ searchParams: { page = "1" } }: Props) => {
  const currentPage = parseInt(page);

  const pageSize = 60;
  const heroItemCount = 0;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products: ProductsWithBrands[] = await prisma.product.findMany({
    include: { brand: true },
    orderBy: { id: "desc" },
    // skip: (currentPage - 1) * pageSize + 1,
    take: pageSize,
  });

  const allBrands = await prisma.brand.findMany();
  const mainCats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  // console.log(mainCats);

  return (
    <div className="flex items-stretch mt-3">
      <aside className="hidden lg:block border-2 w-[25rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
        <Filters brands={allBrands} mainCats={mainCats} />
      </aside>
      <main className=" w-full px-4 mb-10">
        <div className="flex gap-2">
          {mainCats.map((main) => {
            return (
              <Link
                href={`/search/${main.label}`}
                key={main.id}
                className="flex flex-col justify-evenly items-center border border-g1_7 h-48 w-48 rounded-xl border-opacity-25"
              >
                <span className=" text-lg">{main.title}</span>
                <Image
                  src={main.image}
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
        <PageinationBar currentPage={currentPage} totalPages={totalPages} />
      </main>
    </div>
  );
};

export default All_products_page;
