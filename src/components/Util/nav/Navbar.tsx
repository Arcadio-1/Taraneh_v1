import React from "react";
import LogoIcon from "../icons/LogoIcon";
import HelpIcon from "../icons/helpIcon";
import MenuIcon from "../icons/MenuIcon";
import Search from "./components/Search";
import { CatsMenu } from "./components/CatsMenu";
import NavbarLinks from "./components/NavbarLinks";
import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats } from "@/types/type";
import Link from "next/link";
import ShoppingCartButton from "./components/ShoppingCartButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserMenu } from "./components/UserMenu";
import { headers } from "next/headers";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  // console.log(session);
  const headersList = headers();
  // const domain = headersList.get("x-forwarded-host") || "";
  // const protocol = headersList.get("x-forwarded-proto") || "";
  const pathname = headersList.get("x-invoke-path") || "";
  // const regex = new RegExp(/users\/login*/);
  // console.log(regex.test(pathname));
  return (
    <>
      {/* {!regex.test(pathname) && ( */}
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
              <UserMenu callbackPath={pathname} session={session} />
              <ShoppingCartButton />
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:gap-2">
          <CatsMenu mainCats={cats} />
          <NavbarLinks />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Navbar;
