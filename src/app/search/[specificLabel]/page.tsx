import Products from "@/components/Search_page/Products/Products";
import Filters from "@/components/Search_page/filters/Filters";
import PageinationBar from "@/components/Search_page/paginationBar/pageinationBar";
import Sort from "@/components/Search_page/sorts/Sort";
import Breadcrumbs, {
  BreadcrumbsType,
} from "@/components/Util/breadcrumbs/Breadcrumbs";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { specificLabel: string };
  searchParams: { searchQuery: string; page: string; sort: string };
}

const SpecficCategoryPage = async ({
  params: { specificLabel },
  searchParams: { page = "1", searchQuery },
}: Props) => {
  const allProducts = await prisma.product.findMany({
    where: { specific_cat: { label: specificLabel } },
    include: { brand: true, specific_cat: { select: { title: true } } },
  });
  if (!allProducts.length) notFound();
  const breadcrumbsList: BreadcrumbsType[] = [
    {
      title: "ابزار تهیه نوشیدنی",
      link: "/search/tools",
    },
    {
      title: allProducts[0].specific_cat.title,
      link: `/search/${specificLabel}`,
    },
  ];
  const currentPage = parseInt(page);

  const pageSize = 10;
  const heroItemCount = 0;

  const totalItemCount = allProducts.length;

  const totalPages = Math.ceil(totalItemCount / pageSize);

  const specific_products = await prisma.product.findMany({
    where: { specific_cat: { label: specificLabel } },
    include: { brand: true },
    orderBy: { id: "desc" },
    // skip: (currentPage - 1) * pageSize + 1,
    take: pageSize,
  });
  const brands = allProducts.map((product) => product.brand);

  const arrayUniqueByKey = [
    ...new Map(brands.map((item) => [item.id, item])).values(),
  ];
  return (
    <div className="px-8">
      <Breadcrumbs list={breadcrumbsList} />
      <div className="flex items-stretch mt-3">
        <aside className="hidden lg:block border-2 w-[25rem] text-dark_4 border-dark_6 border-opacity-40 rounded-xl py-3 px-5">
          <Filters brands={arrayUniqueByKey} />
        </aside>
        <main className=" w-full px-4 mb-10">
          <Sort />
          <Products products={specific_products} />
          <PageinationBar
            searchQuery={searchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </main>
      </div>
    </div>
  );
};

export default SpecficCategoryPage;
