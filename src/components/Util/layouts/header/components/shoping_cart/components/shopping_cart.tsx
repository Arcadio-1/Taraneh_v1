import { ShoppingCart } from "@/types_validation/type";
import React from "react";
import Content from "./content";
import Header from "./header";
import Footer from "./footer";

interface Props {
  cart: ShoppingCart;
  sheet: boolean;
}

const Shopping_cart = ({ cart, sheet }: Props) => {
  return (
    <>
      <Header cart_size={cart.size} />
      <Content sheet={sheet} cart={cart} />
      <Footer sheet={sheet} cart_subtotal={cart.subTotalWithDiscount} />
    </>
  );
};

export default Shopping_cart;
