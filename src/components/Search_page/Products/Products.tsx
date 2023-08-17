import { Product } from "@prisma/client";
import React from "react";
import List from "./components/List";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  return (
    <div className="">
      <List products={products} />
    </div>
  );
};

export default Products;
