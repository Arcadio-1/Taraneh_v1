import React from "react";
import ProdImage from "./image/ProdImage";
import Header from "./header/Header";
import Prod_specification from "./specifications/Prod_specification";
import Prod_order from "./order/Prod_order";
import { Product_full, ShoppingCart } from "@/types/type";

interface Props {
  product: Product_full;
  cart: ShoppingCart | null;
  product_id: string;
}

const Main = ({ product, product_id, cart }: Props) => {
  return (
    <section className="lg:grid lg:grid-cols-3 flex flex-col">
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

        <div className="grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 ">
          <Prod_specification product={product} />
          <Prod_order
            status={product.status}
            price={product.price}
            offPercent={product.off_percent}
            product_Id={product_id}
            cart={cart}
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
