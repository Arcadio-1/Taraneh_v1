import React from "react";
import List from "./components/List";
import SortIcon from "@/components/Util/icons/SortIcon";

export interface SortItem {
  id: string;
  title: string;
  value: string;
}
export type SortItems = SortItem[];

const Sort = () => {
  const sortItems: SortItems = [
    {
      id: "1",
      title: "گرانترین",
      value: "1",
    },
    {
      id: "2",
      title: "ارزانترین",
      value: "2",
    },
    {
      id: "3",
      title: "پربازدیدترین",
      value: "3",
    },
    {
      id: "4",
      title: "پرفروش ترین",
      value: "4",
    },
    {
      id: "5",
      title: "محبوب ترین",
      value: "5",
    },
    {
      id: "6",
      title: "جدیدترین",
      value: "6",
    },
  ];
  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center justify-center">
        <SortIcon classes="w-6 h-6" />
        <label className="font-iransansbold text-lg">مرتب سازی:</label>
      </div>
      <List sortItems={sortItems} />
    </div>
  );
};

export default Sort;
