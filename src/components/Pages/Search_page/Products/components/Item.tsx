import Product_grid_card from "@/components/Util/product_card/grid/Product_grid_card";
import { Product } from "@prisma/client";
import React from "react";
interface Props {
  product: Product;
}

const Item = ({ product }: Props) => {
  return (
    <div className="sm:border-l border-b border-dark_6 border-opacity-40">
      <Product_grid_card product={product} />
    </div>
  );
};

export default Item;
