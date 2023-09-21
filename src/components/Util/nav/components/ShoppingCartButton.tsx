import React from "react";
import CartIcon from "../../icons/CartIcon";
import { ShoppingCart } from "@/types/type";

interface Props {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: Props) => {
  return (
    <div className="relative mx-2">
      <span className="absolute bottom-[-5px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum">
        {cart ? cart.size : "0"}
      </span>
      <CartIcon clasess="h-10 w-10 stroke-dark_4" />
    </div>
  );
};

export default ShoppingCartButton;
