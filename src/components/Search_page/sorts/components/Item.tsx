"use client";
import React from "react";
import { SortItem } from "../Sort";

interface Props {
  sortItem: SortItem;
}

const Item = ({ sortItem }: Props) => {
  return (
    <div>
      <span
        className="text-lg font-iranyekan cursor-pointer text-dark_4"
        onClick={() => console.log(sortItem.value)}
      >
        {sortItem.title}
      </span>
    </div>
  );
};

export default Item;
