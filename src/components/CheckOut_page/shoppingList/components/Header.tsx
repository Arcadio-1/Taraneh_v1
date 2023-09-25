import MenuDotIcon from "@/components/Util/icons/MenuDotIcon";
import React from "react";
import ShoppingListMenu from "./ShoppingListMenu";

interface Props {
  cart_size: number;
  cart_id: string;
}

const Header = ({ cart_size, cart_id }: Props) => {
  return (
    <div className="flex justify-between items-start pb-5 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-iranyekan_bold font-bold text-xl text-dark_3">
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
