import { Product } from "@prisma/client";
import React from "react";
import Item from "./Item";
interface Props {
  products: Product[];
}

const List = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 m-2 border-t border-dark_6 border-opacity-40">
      {products.map((product) => {
        return <Item key={product.id} product={product} />;
      })}
    </div>
  );
};

export default List;
