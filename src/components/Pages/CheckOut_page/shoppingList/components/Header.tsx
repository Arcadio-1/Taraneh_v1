import React from "react";
import ShoppingListMenu from "./ShoppingListMenu";

interface Props {
  cart_size: number;
  cart_id: string;
}

const Header = ({ cart_size, cart_id }: Props) => {
  return (
    <div className="flex items-start justify-between px-4 pb-5">
      <div className="flex flex-col gap-2">
        <h1 className="font-iranyekan_bold text-xl font-bold text-dark_3">
          سبد خرید شما
        </h1>
        <div className="text-dark-5">
          <span className="font-iransansnum">{cart_size}</span>
          <span> کالا</span>
        </div>
      </div>
      <ShoppingListMenu cart_id={cart_id} />
    </div>
  );
};

export default Header;
