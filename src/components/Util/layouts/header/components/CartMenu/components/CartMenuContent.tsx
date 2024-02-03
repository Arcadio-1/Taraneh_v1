import { ShoppingCart } from "@/types_validation/type";
import React from "react";
import Content from "./content";
import Header from "./header";
import Footer from "./footer";

interface Props {
  cart: ShoppingCart;
  sheet: boolean;
}

const CartMenuContent = ({ cart, sheet }: Props) => {
  return (
    <div className="flex max-h-full flex-col gap-4">
      <Header cart_size={cart.size} />
      <Content sheet={sheet} cart={cart} />
      <Footer sheet={sheet} cart_subtotal={cart.subTotalWithDiscount} />
    </div>
  );
};

export default CartMenuContent;
