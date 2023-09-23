"use client";
import React, { useEffect, useState } from "react";
import LogoIcon from "../icons/LogoIcon";
import HelpIcon from "../icons/helpIcon";
import MenuIcon from "../icons/MenuIcon";
import Search from "./components/Search";
import { CatsMenu } from "./components/CatsMenu";
import NavbarLinks from "./components/NavbarLinks";
import { MainCatsWithSpecificCats, ShoppingCart } from "@/types/type";
import Link from "next/link";
import ShoppingCartButton from "./components/shoping_cart/ShoppingCartButton";
import { Session } from "next-auth";
import { UserMenu } from "./components/UserMenu";
import Log from "./Log";

interface Props {
  cats: MainCatsWithSpecificCats[];
  session: Session | null;
  cart: ShoppingCart | null;
}

const Navbar = ({ cats, session, cart }: Props) => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount ? (
        <>
          <div className="px-4">
            <div className="mb-3 md:flex md:gap-6">
              <div className="flex items-center justify-between">
                <MenuIcon clasees="h-[3rem] w-[3rem] md:hidden" />
                <Link href={"/"}>
                  <LogoIcon classes="h-[6rem] w-[12rem] fill-g1_7" />
                </Link>
                <HelpIcon classes="h-10 w-10 md:hidden" />
              </div>
              <div className="flex justify-between items-center gap-4 md:grow">
                <Search />
                <div className="flex items-center gap-2">
                  {session && <UserMenu session={session} />}
                  {!session && <Log />}

                  <ShoppingCartButton cart={cart} />
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:gap-2">
              <CatsMenu mainCats={cats} />
              <NavbarLinks />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
