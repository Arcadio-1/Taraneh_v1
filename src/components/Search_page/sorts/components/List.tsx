import React from "react";
import { SortItems } from "../Sort";
import Item from "./Item";
interface Props {
  sortItems: SortItems;
}

const List = ({ sortItems }: Props) => {
  return (
    <div className="flex gap-6">
      {sortItems.map((item) => {
        return <Item sortItem={item} key={item.id} />;
      })}
    </div>
  );
};

export default List;
