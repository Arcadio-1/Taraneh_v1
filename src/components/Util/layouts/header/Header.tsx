"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import { getServerSession } from "next-auth";
import React, { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import LogoIcon from "../../ui/icons/LogoIcon";
import HelpIcon from "../../ui/icons/helpIcon";
import Mobile_menu from "./components/Mobile_menu/Mobile_menu";
import Search from "./components/Search";
import UserMenu from "./components/UserMenu";
import Log from "./components/Log";
import CartMenu from "./components/CartMenu/CartMenu";
import { CatsMenu } from "./components/CatsMenu";
import NavbarLinks from "./components/NavbarLinks";

const getData = cache(async () => {
  try {
    const session = await getServerSession(authOptions);
    const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
      include: { Specific_cat: true },
    });
    if (!cats) {
      return notFound();
    }
    return { session, cats };
  } catch (error) {
    return notFound();
  }
});

const Header = async () => {
  const { cats, session } = await getData();

  return (
    <header>
      <div className="px-4 pb-4">
        <div className="mb-3 md:flex md:gap-6">
          <div className="flex items-center justify-between">
            <Mobile_menu cats={cats} />
            <Link href={"/"}>
              <LogoIcon className="h-[6rem] w-[12rem]" />
            </Link>
            <HelpIcon classes="h-10 w-10 md:hidden" />
          </div>
          <div className="flex items-center justify-between gap-4 md:grow">
            <Search />
            <div className="flex items-stretch gap-5">
              {session && <UserMenu session={session} />}
              {!session && <Log />}
              <span className=" w-1 border-l"></span>
              <CartMenu />
            </div>
          </div>
        </div>
        <div className="text-g1 hidden border-b-g1_7 md:flex md:gap-2">
          <CatsMenu mainCats={cats} />
          <NavbarLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
