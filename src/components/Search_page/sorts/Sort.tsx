"use client";
import React from "react";
import SortIcon from "@/components/Util/icons/SortIcon";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import { SortItems } from "@/types/type";
import CheckIcon from "@/components/Util/icons/CheckIcon";
enum SortValue {
  grtPrice = "0",
  lwrPrice = "1",
  grtView = "2",
  grtSale = "3",
  fav = "4",
  newst = "5",
}
interface Props {
  searchQuery: string;
  bQ: string[];
  maxPrice: string;
  minPrice: string;
  sort: string;
}

const Sort = ({ searchQuery, bQ, maxPrice, minPrice, sort = "2" }: Props) => {
  const sortItems: SortItems = [
    {
      id: "0",
      title: "گرانترین",
      value: SortValue.grtPrice,
    },
    {
      id: "1",
      title: "ارزانترین",
      value: SortValue.lwrPrice,
    },
    {
      id: "2",
      title: "پربازدیدترین",
      value: SortValue.grtView,
    },
    {
      id: "3",
      title: "پرفروش ترین",
      value: SortValue.grtSale,
    },
    {
      id: "4",
      title: "محبوب ترین",
      value: SortValue.fav,
    },
    {
      id: "5",
      title: "جدیدترین",
      value: SortValue.newst,
    },
  ];
  const url = `?${searchQuery ? `searchQuery=${searchQuery}&` : ""}${bQ
    .map((item) => {
      return `bQ=${item}`;
    })
    .toString()
    .replaceAll(",", "&")}${bQ.length ? `&` : ``}${
    !!minPrice && !!maxPrice ? `minPrice=${minPrice}&maxPrice=${maxPrice}&` : ``
  }sort=`;
  return (
    <div>
      <div className="hidden md:flex items-center gap-3 py-4">
        <div className="flex items-center justify-center">
          <SortIcon classes="w-6 h-6" />
          <label className="font-iransansbold text-lg">مرتب سازی:</label>
        </div>
        <div className="flex gap-4">
          {sortItems.map((item) => {
            return (
              <Link
                key={item.id}
                href={`${url}${item.value}`}
                className={`text-lg font-iranyekan cursor-pointer text-dark_4 px-2 py-1 rounded-lg ${
                  item.value === sort ? `text-dark_1 bg-slate-100` : ``
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex md:hidden items-center gap-3 py-4">
        <Sheet>
          <div>
            <SheetTrigger asChild>
              <div className="flex items-center justify-center">
                <SortIcon classes="w-10 h-10 fill-red" />
                {sortItems.map((item) => {
                  return (
                    <button
                      hidden={item.value !== sort}
                      key={item.id}
                      className={`text-xl font-iranyekan_bold cursor-pointer text-dark_2 px-2 py-1 rounded-lg `}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </div>
            </SheetTrigger>
          </div>
          <SheetContent side={"bottom"}>
            <SheetHeader className="flex justify-between items-start mb-5">
              <SheetTitle className="font-iranyekan_bold text-xl text-dark_4">
                مرتب سازی بر اساس
              </SheetTitle>
            </SheetHeader>
            <div className="flex gap-4 flex-col">
              {sortItems.map((item) => {
                return (
                  <SheetClose key={item.id} asChild>
                    <Link
                      href={`${url}${item.value}`}
                      className={`flex justify-between items-center text-xl font-iranyekan_bold cursor-pointer text-dark_4 px-2 py-4 rounded-lg ${
                        item.value === sort ? `text-dark_1 bg-slate-50` : ``
                      }`}
                    >
                      {item.title}
                      {item.value === sort && <CheckIcon clasess="w-8 h-8" />}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
            {/* <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter> */}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Sort;
