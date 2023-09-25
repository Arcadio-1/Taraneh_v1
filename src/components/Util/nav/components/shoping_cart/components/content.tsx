import { ShoppingCart } from "@/types/type";
import React from "react";
import Entry_item from "./entry_item";

interface Props {
  cart: ShoppingCart;
}

const Content = ({ cart }: Props) => {
  return (
    <div>
      <div className="max-h-[35rem] overflow-y-scroll py-2" dir="rtl">
        {cart.items.map((item) => {
          return <Entry_item key={item.productId} cart_item={item} />;
        })}
      </div>
    </div>
  );
};

export default Content;
