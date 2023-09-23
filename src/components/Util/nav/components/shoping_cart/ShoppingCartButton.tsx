import React from "react";
import CartIcon from "../../../icons/CartIcon";
import { ShoppingCart } from "@/types/type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components_shadcn/ui/hover-card";
import Shopping_cart from "./components/shopping_cart";
interface Props {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: Props) => {
  return (
    <>
      {cart ? (
        <div>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild className="">
              <div className="relative p-1 duration-0 data-[state=open]:bg-red-100 rounded-lg">
                <span className="absolute bottom-[-5px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum">
                  {cart.size}
                </span>
                <CartIcon clasess="h-10 w-10 stroke-dark_4" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-[40rem] rounded-[5px] bg-white">
              <Shopping_cart cart={cart} />
            </HoverCardContent>
          </HoverCard>
        </div>
      ) : (
        <div className="relative mx-2 duration-0">
          <span className="absolute bottom-[-5px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum">
            0
          </span>
          <CartIcon clasess="h-10 w-10 stroke-dark_4" />
        </div>
      )}
    </>
  );
};

export default ShoppingCartButton;
