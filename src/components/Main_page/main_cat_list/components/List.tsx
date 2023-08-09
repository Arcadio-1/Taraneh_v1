import React from "react";
import Item from "./Item";
import { Main_cat } from "@prisma/client";

interface Props {
  main_cats: Main_cat[];
}

const List = ({ main_cats }: Props) => {
  return (
    <div className="flex flex-row gap-3 max-md:flex-col">
      {main_cats.map((cat) => {
        return <Item key={cat.id} cat={cat} />;
      })}
    </div>
  );
};

export default List;
