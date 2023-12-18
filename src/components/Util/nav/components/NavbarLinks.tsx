import React from "react";
import PercentIcon from "../../icons/PercentIcon";
import BlogIcon from "../../icons/BlogIcon";
import FixingIcon from "../../icons/FixingIcon";
import Link from "next/link";
import BoxingIcon from "../../icons/BoxingIcon";
// import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";

const NavbarLinks = () => {
  return (
    <ul className="flex items-center text-lg gap-8 font-iranyekan_bold border-r-2 px-4 py-2">
      <li className="flex items-center justify-center gap-2">
        <BoxingIcon classes="w-6 h-6 fill-dark_4" />
        <Link className="text-dark_4" href={"/search"}>
          کل محصولات
        </Link>
      </li>
      <li className="flex items-center justify-center gap-2">
        <PercentIcon clasess="h-6 -w-6 fill-dark_4" />
        <Link className="text-dark_4" href={"#"}>
          فروش ویژه
        </Link>
      </li>
      <li className="flex items-center justify-center gap-2">
        <BlogIcon clasess="h-6 -w-6 fill-dark_4" />
        <Link className="text-dark_4" href={"#"}>
          مجله آموزشی و خبری
        </Link>
      </li>
      {/* <li className="flex items-center justify-center gap-2">
        <FixingIcon clasess="h-6 -w-6 fill-dark_4" />
        <Link className="text-dark_4" href={"#"}>
          تعمیرات
        </Link>
      </li> */}
    </ul>
  );
};

export default NavbarLinks;
