import React from "react";
import ProdImage from "./image/ProdImage";
import Header from "./header/Header";
import Prod_specification from "./specifications/Prod_specification";
import Prod_order from "./order/Prod_order";
import { Product_full, ShoppingCart } from "@/types_validation/type";

interface Props {
  product: Product_full;
}

const Main = ({ product }: Props) => {
  return (
    <section className="flex flex-col lg:grid lg:grid-cols-3">
      <ProdImage
        product_image_url={product.image_url}
        product_title={product.title}
      />
      <div className="col-span-2">
        <Header
          product_brand={product.brand}
          product_title={product.title}
          product_cat={product.specific_cat.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3">
          <Prod_specification product={product} />
          <Prod_order
            status={product.status}
            price={product.price}
            offPercent={product.off_percent}
            product_Id={product.id}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
