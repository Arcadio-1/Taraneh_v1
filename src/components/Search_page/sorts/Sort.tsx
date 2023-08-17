import React from "react";
import List from "./components/List";

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
        <svg viewBox="0 0 256 256" className="h-6 w-6">
          <polyline
            fill="none"
            points="144 168 184 208 224 168"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="184"
            x2="184"
            y1="112"
            y2="208"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="120"
            y1="128"
            y2="128"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="184"
            y1="64"
            y2="64"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="104"
            y1="192"
            y2="192"
          />
        </svg>
        <label className="font-iransansbold text-lg">مرتب سازی:</label>
      </div>
      <List sortItems={sortItems} />
    </div>
  );
};

export default Sort;
