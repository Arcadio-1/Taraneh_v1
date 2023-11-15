import React from "react";
import SortIcon from "@/components/Util/icons/SortIcon";
import Link from "next/link";

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
}

const Sort = ({ searchQuery }: Props) => {
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

  const url = `?${searchQuery ? `searchQuery=${searchQuery}&` : ""}sort=`;
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center justify-center">
        <SortIcon classes="w-6 h-6" />
        <label className="font-iransansbold text-lg">مرتب سازی:</label>
      </div>
      <div className="flex gap-6">
        {sortItems.map((item) => {
          return (
            <Link
              key={item.id}
              href={`${url}${item.value}`}
              className="text-lg font-iranyekan cursor-pointer text-dark_4"
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
