import { ShoppingCart } from "@/types/type";
import React from "react";
import Content from "./content";
import Header from "./header";
import Footer from "./footer";

interface Props {
  cart: ShoppingCart;
}

const Shopping_cart = ({ cart }: Props) => {
  return (
    <>
      <Header cart_size={cart.size} />
      <Content cart={cart} />
      <Footer cart_subtotal={cart.subTotalWithDiscount} />
    </>
  );
};

export default Shopping_cart;
