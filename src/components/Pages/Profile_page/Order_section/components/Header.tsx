import { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import ArrowLongIcon from "@/components/Util/ui/icons/ArrowLongIcon";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="p-4">
      <Link href={`/profile/orders`} className="flex items-center gap-2">
        <ArrowLongIcon direction={Arrow.right} classes="h-8 w-8 fill-dark_5" />
        <span className="text-xl">جزئیات سفارش</span>
      </Link>
    </div>
  );
};

export default Header;
