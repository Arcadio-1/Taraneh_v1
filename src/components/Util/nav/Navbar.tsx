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
// import { UserMenuMui } from "./components/UserMenuMui";
import Log from "./Log";
import { usePathname } from "next/navigation";
import UserMenu from "./components/UserMenu";
import Main_menu from "./components/shoping_cart/Main_menu/Main_menu";

interface Props {
  cats: MainCatsWithSpecificCats[];
  session: Session | null;
  cart: ShoppingCart | null;
}

const navDiablerPaths: string[] = ["/shipping", "/payment", "/users/login"];

const Navbar = ({ cats, session, cart }: Props) => {
  const [mount, setMount] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setMount(true);
    navDiablerPaths.map((path) => {
      if (path === pathname) {
        setMount(false);
      }
    });
  }, [pathname]);

  return (
    <>
      {mount ? (
        <>
          <div className="px-4 pb-4">
            <div className="mb-3 md:flex md:gap-6">
              <div className="flex items-center justify-between">
                <Main_menu cats={cats} />
                <Link href={"/"}>
                  <LogoIcon classes="h-[6rem] w-[12rem] fill-g1_7" />
                </Link>
                <HelpIcon classes="h-10 w-10 md:hidden" />
              </div>
              <div className="flex items-center justify-between gap-4 md:grow">
                <Search />
                <div className="flex items-stretch gap-5">
                  {session && <UserMenu session={session} />}
                  {/* {session && <UserMenuMui session={session} />} */}
                  {!session && <Log />}
                  <span className=" w-1 border-l"></span>
                  <ShoppingCartButton cart={cart} />
                </div>
              </div>
            </div>
            <div className="text-g1 hidden border-b-g1_7 md:flex md:gap-2">
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
