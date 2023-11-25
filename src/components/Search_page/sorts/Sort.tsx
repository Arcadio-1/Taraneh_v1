"use client";
import React from "react";
import SortIcon from "@/components/Util/icons/SortIcon";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export enum SortValue {
  grtPrice = "0",
  lwrPrice = "1",
  grtView = "2",
  grtSale = "3",
  fav = "4",
  newst = "5",
}
export interface SortItem {
  id: string;
  title: string;
  value: SortValue;
}
export type SortItems = SortItem[];

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
  console.log(sort);
  const url = `?${searchQuery ? `searchQuery=${searchQuery}&` : ""}${bQ
    .map((item) => {
      return `bQ=${item}`;
    })
    .toString()
    .replaceAll(",", "&")}${bQ.length ? `&` : ``}${
    !!minPrice && !!maxPrice ? `minPrice=${minPrice}&maxPrice=${maxPrice}&` : ``
  }sort=`;
  return (
    <div className="flex items-center gap-3 py-4">
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
  );
};

export default Sort;
