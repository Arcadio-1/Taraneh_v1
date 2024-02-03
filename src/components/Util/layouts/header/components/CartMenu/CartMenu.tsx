import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/Util/shadcn/ui/hover-card";
import Shopping_cart from "./components/CartMenuContent";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/Util/shadcn/ui/sheet";
import { getCart } from "@/actions/getCart";
import CartIcon from "@/components/Util/ui/icons/CartIcon";

const CartMenu = async () => {
  const cart = await getCart();
  return (
    <>
      <div className="hidden md:flex">
        {cart && cart.size > 0 ? (
          <div>
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger asChild className="">
                <div className="relative mx-2 rounded-lg p-1 duration-0 data-[state=open]:bg-red-100">
                  <span className="absolute bottom-[-5px] right-[-7px] flex items-center justify-center rounded-[5px] bg-g1_5 bg-opacity-90 px-2 py-[1px] font-iransansnum text-xl text-light_2">
                    {cart.size}
                  </span>
                  <CartIcon classes="h-9 w-9 fill-dark_4" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="z-50 w-[40rem] rounded-[5px] !bg-white">
                <Shopping_cart sheet={false} cart={cart} />
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <Link
            href={"/checkout"}
            className="relative mx-2 rounded-lg p-1 duration-0 data-[state=open]:bg-red-100"
          >
            <span className="absolute bottom-[0px] right-[-7px] flex items-center justify-center rounded-[5px] bg-g1_5 bg-opacity-90 px-2 py-[1px] font-iransansnum text-light_2">
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
                <div className="relative mx-2 cursor-pointer rounded-lg p-1 duration-0 data-[state=open]:bg-red-100">
                  <span className="absolute bottom-[-5px] right-[-7px] flex items-center justify-center rounded-[5px] bg-g1_5 bg-opacity-90 px-2 py-[1px] font-iransansnum text-xl text-light_2">
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
            href={"/checkout"}
            className="relative mx-2 rounded-lg p-1 duration-0 data-[state=open]:bg-red-100"
          >
            <span className="absolute bottom-[0px] right-[-7px] flex items-center justify-center rounded-[5px] bg-g1_5 bg-opacity-90 px-2 py-[1px] font-iransansnum text-light_2">
              0
            </span>
            <CartIcon classes="h-9 w-9 fill-dark_4" />
          </Link>
        )}
      </div>
    </>
  );
};

export default CartMenu;
