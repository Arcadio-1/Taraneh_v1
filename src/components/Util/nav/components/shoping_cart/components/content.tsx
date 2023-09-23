import { ScrollArea } from "@/components_shadcn/ui/scroll-area";
import { ShoppingCart } from "@/types/type";
import React from "react";
import Entry_item from "./entry_item";

interface Props {
  cart: ShoppingCart;
}

const Content = ({ cart }: Props) => {
  return (
    <div>
      <div
        className="h-[35rem] overflow-y-scroll py-2 last-of-type:bg-red"
        dir="rtl"
      >
        {cart.items.map((item) => {
          return <Entry_item key={item.productId} cart_item={item} />;
        })}
      </div>
    </div>
  );
};

export default Content;
