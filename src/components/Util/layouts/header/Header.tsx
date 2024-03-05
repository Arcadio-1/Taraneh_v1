import React, { Suspense } from "react";
import Link from "next/link";
import LogoIcon from "../../ui/icons/LogoIcon";
import HelpIcon from "../../ui/icons/helpIcon";
import Search from "./components/Search";
import CartMenu from "./components/CartMenu/CartMenu";
import { CatsMenu } from "./components/CatsMenu";
import NavbarLinks from "./components/NavbarLinks";
import { User } from "./components/User/User";
import { Mobile_menu } from "./components/Mobile_menu/Mobile_menu";

const Header = async () => {
  return (
    <header>
      <div className="px-4 pb-4">
        <div className="md:flex md:gap-6">
          <div className="flex items-center justify-between">
            <Suspense fallback={<h1>loading</h1>}>
              <Mobile_menu />
            </Suspense>
            <Link href={"/"}>
              <LogoIcon className="h-[6rem] w-[12rem]" />
            </Link>
            <HelpIcon className="h-10 w-10 md:hidden" />
          </div>
          <div className="flex items-center justify-between gap-4 md:grow">
            <Search />
            <div className="flex items-stretch gap-2">
              <User />
              <div className=" w-[.5px] bg-slate-300"></div>
              <CartMenu />
            </div>
          </div>
        </div>
        <div className="text-g1 hidden md:flex md:gap-2">
          <Suspense fallback={<h1>loading</h1>}>
            <CatsMenu />
          </Suspense>
          <NavbarLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
