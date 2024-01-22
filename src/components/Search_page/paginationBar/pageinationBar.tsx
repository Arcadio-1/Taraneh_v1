"use client";
import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { SortValue } from "@/types_validation/type";

interface Props {
  currentPage: number;
  totalPages: number;
  searchQuery: string | undefined;
  sort: SortValue;
  bQ: string[];
  maxPrice: string;
  minPrice: string;
}

const PageinationBar = ({
  currentPage,
  totalPages,
  searchQuery = "",
  maxPrice = "",
  minPrice = "",
  sort = SortValue.grtView,
  bQ,
}: Props) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 5));
  const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4));
  const url = `?${sort !== SortValue.grtView ? `sort=${sort}&` : ``}${bQ
    .map((item) => {
      return `bQ=${item}`;
    })
    .toString()
    .replaceAll(",", "&")}${bQ.length ? `&` : ``}${
    !!minPrice && !!maxPrice ? `minPrice=${minPrice}&maxPrice=${maxPrice}&` : ``
  }page=`;

  let numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`${url}${page}`}
        key={page}
        className={`flex h-12 w-12 items-center justify-center rounded-full font-iransansnum text-2xl transition-all duration-300 hover:bg-slate-100 ${
          currentPage === page ? "bg-slate-200 hover:bg-slate-200" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }
  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="hidden items-center gap-3 sm:flex">
        {currentPage === 1 ? (
          <div>
            <ArrowIcon classes="h-4 w-4 fill-dark_6" direction={Arrow.right} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage - 1}`}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:bg-slate-100 `}
          >
            <ArrowIcon classes="h-4 w-4" direction={Arrow.right} />
          </Link>
        )}
        {currentPage > 3 && (
          <>
            <Link
              href={`${url}${1}`}
              key={1}
              className={`flex h-12 w-12 items-center justify-center rounded-full font-iransansnum text-2xl transition-all duration-300 hover:bg-slate-100 ${
                currentPage === 1 ? "bg-slate-200 hover:bg-slate-200" : ""
              }`}
            >
              {1}
            </Link>
            <span>...</span>
          </>
        )}
        {numberedPageItems}
        {currentPage < totalPages - 2 && (
          <>
            <span>...</span>
            <Link
              href={`${url}${totalPages}`}
              key={totalPages}
              className={`flex h-12 w-12 items-center justify-center rounded-full font-iransansnum text-2xl transition-all duration-300 hover:bg-slate-100 ${
                currentPage === totalPages
                  ? "bg-slate-200 hover:bg-slate-200"
                  : ""
              }`}
            >
              {totalPages}
            </Link>
          </>
        )}
        {currentPage === totalPages ? (
          <div>
            <ArrowIcon classes="h-4 w-4 fill-dark_6" direction={Arrow.left} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage + 1}`}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:bg-slate-100 `}
          >
            <ArrowIcon classes="h-4 w-4" direction={Arrow.left} />
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 sm:hidden">
        {currentPage === 1 ? (
          <div>
            <ArrowIcon classes="h-5 w-5 fill-dark_6" direction={Arrow.right} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage - 1}`}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:bg-slate-100 `}
          >
            <ArrowIcon classes="h-5 w-5" direction={Arrow.right} />
          </Link>
        )}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl">صفحه</span>
          <span className="font-iransansnum text-2xl">{currentPage}</span>
        </div>
        {currentPage === totalPages ? (
          <div>
            <ArrowIcon classes="h-5 w-5 fill-dark_6" direction={Arrow.left} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage + 1}`}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:bg-slate-100 `}
          >
            <ArrowIcon classes="h-5 w-5" direction={Arrow.left} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageinationBar;
