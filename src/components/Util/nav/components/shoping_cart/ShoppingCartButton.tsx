import React from "react";
import CartIcon from "../../../icons/CartIcon";
import { ShoppingCart } from "@/types/type";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components_shadcn/ui/hover-card";
import Shopping_cart from "./components/shopping_cart";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
interface Props {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: Props) => {
  return (
    <>
      <div className="hidden md:flex">
        {cart && cart.size > 0 ? (
          <div>
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild className="">
                <div className="relative p-1 mx-2 duration-0 data-[state=open]:bg-red-100 rounded-lg">
                  <span className="absolute bottom-[-5px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum text-xl">
                    {cart.size}
                  </span>
                  <CartIcon classes="h-9 w-9 fill-dark_4" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-[40rem] rounded-[5px] bg-white z-50">
                <Shopping_cart sheet={false} cart={cart} />
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <Link
            href={"/checkout"}
            className="relative p-1 mx-2 duration-0 data-[state=open]:bg-red-100 rounded-lg"
          >
            <span className="absolute bottom-[0px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum">
              0
            </span>
            <CartIcon classes="h-9 w-9 fill-dark_4" />
          </Link>
        )}
      </div>
      <div className="flex md:hidden">
        {cart && cart.size > 0 ? (
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <div className="relative p-1 mx-2 duration-0 data-[state=open]:bg-red-100 rounded-lg cursor-pointer">
                  <span className="absolute bottom-[-5px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum text-xl">
                    {cart.size}
                  </span>
                  <CartIcon classes="h-9 w-9 fill-dark_4" />
                </div>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <Shopping_cart sheet={true} cart={cart} />
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <Link
            href={"/chekout"}
            className="relative p-1 mx-2 duration-0 data-[state=open]:bg-red-100 rounded-lg"
          >
            <span className="absolute bottom-[0px] right-[-7px] bg-g1_5 bg-opacity-90 text-light_2 py-[1px] px-2 flex items-center justify-center rounded-[5px] font-iransansnum">
              0
            </span>
            <CartIcon classes="h-9 w-9 fill-dark_4" />
          </Link>
        )}
      </div>
    </>
  );
};

export default ShoppingCartButton;
