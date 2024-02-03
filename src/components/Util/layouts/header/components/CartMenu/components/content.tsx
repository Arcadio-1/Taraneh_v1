import { ShoppingCart } from "@/types_validation/type";
import React from "react";
import Entry_item from "./entry_item";

interface Props {
  cart: ShoppingCart;
  sheet: boolean;
}

const Content = ({ cart, sheet }: Props) => {
  return (
    <div className="overflow-y-scroll py-2 md:max-h-[35rem]" dir="rtl">
      {cart.items.map((item) => {
        return (
          <Entry_item sheet={sheet} key={item.productId} cart_item={item} />
        );
      })}
    </div>
  );
};

export default Content;
