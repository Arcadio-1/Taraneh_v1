import React from "react";
import LogoIcon from "../icons/LogoIcon";
import HelpIcon from "../icons/helpIcon";
import MenuIcon from "../icons/MenuIcon";
import CartIcon from "../icons/CartIcon";
import Search from "./components/Search";
import CatsMenu from "./components/CatsMenu/CatsMenu";
import NavbarLinks from "./components/NavbarLinks";
import { MegaMenu } from "./components/CatsMenu/components/MegaMenu";
import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats } from "@/types/type";

const Navbar = async () => {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });

  return (
    <div className="px-4">
      <div className="mb-3 md:flex md:gap-6">
        <div className="flex items-center justify-between">
          <MenuIcon clasees="h-[3rem] w-[3rem] md:hidden" />
          <LogoIcon classes="h-[6rem] w-[12rem] fill-g1_7" />
          <HelpIcon classes="h-10 w-10 md:hidden" />
        </div>
        <div className="flex justify-between items-center gap-4 md:grow">
          <Search />
          <CartIcon clasess="h-10 w-10 stroke-dark_4" />
        </div>
      </div>
      <div className="hidden md:flex md:gap-2">
        <CatsMenu cats={cats} />
        {/* <MegaMenu /> */}
        <NavbarLinks />
      </div>
    </div>
  );
};

export default Navbar;
