"use client";
import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import Link from "next/link";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  searchQuery: string | undefined;
}

const PageinationBar = ({
  currentPage,
  totalPages,
  searchQuery = "",
}: Props) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 5));
  const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4));

  const url = `${searchQuery && `?searchQuery=${searchQuery}&`}${
    searchQuery ? "" : "?"
  }page=`;

  let numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={`${url}${page}`}
        key={page}
        className={`font-iransansnum text-2xl h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 ${
          currentPage === page ? "bg-slate-200 hover:bg-slate-200" : ""
        }`}
      >
        {page}
      </Link>
    );
  }
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="hidden sm:flex items-center gap-3">
        {currentPage === 1 ? (
          <div>
            <ArrowIcon classes="h-4 w-4 fill-dark_6" direction={Arrow.right} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage - 1}`}
            className={`h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 `}
          >
            <ArrowIcon classes="h-4 w-4" direction={Arrow.right} />
          </Link>
        )}
        {currentPage > 3 && (
          <>
            <Link
              href={`${url}${1}`}
              key={1}
              className={`font-iransansnum text-2xl h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 ${
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
              className={`font-iransansnum text-2xl h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 ${
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
            className={`h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 `}
          >
            <ArrowIcon classes="h-4 w-4" direction={Arrow.left} />
          </Link>
        )}
      </div>
      <div className="items-center flex gap-4 justify-center sm:hidden">
        {currentPage === 1 ? (
          <div>
            <ArrowIcon classes="h-5 w-5 fill-dark_6" direction={Arrow.right} />
          </div>
        ) : (
          <Link
            href={`${url}${currentPage - 1}`}
            className={`h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 `}
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
            className={`h-12 w-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 `}
          >
            <ArrowIcon classes="h-5 w-5" direction={Arrow.left} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageinationBar;
