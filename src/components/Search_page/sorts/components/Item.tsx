"use client";
import React from "react";
import { SortItem } from "../Sort";
import Link from "next/link";

interface Props {
  sortItem: SortItem;
}

const Item = ({ sortItem }: Props) => {
  return (
    <div>
      <Link
        href={`?sort=${sortItem.value}`}
        className="text-lg font-iranyekan cursor-pointer text-dark_4"
        onClick={() => console.log(sortItem.value)}
      >
        {sortItem.title}
      </Link>
    </div>
  );
};

export default Item;
