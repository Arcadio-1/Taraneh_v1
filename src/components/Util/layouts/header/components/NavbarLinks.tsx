import React from "react";
import Link from "next/link";
import BoxingIcon from "@/components/Util/ui/icons/BoxingIcon";
import PercentIcon from "@/components/Util/ui/icons/PercentIcon";
import BlogIcon from "@/components/Util/ui/icons/BlogIcon";

const NavbarLinks = () => {
  return (
    <ul className="flex items-center gap-8 border-r-2 px-4 py-2 font-iranyekan_bold text-lg">
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
    </ul>
  );
};

export default NavbarLinks;
