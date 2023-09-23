import Link from "next/link";
import React from "react";

interface Props {
  cart_size: number;
}

const Header = ({ cart_size }: Props) => {
  return (
    <div className="flex justify-between items-center py-4 px-2">
      <p>
        <span className="font-iransansnum">{cart_size}</span>
        <span> کالا </span>
      </p>
      {/* <Link href={"#"}>مشاهده سبد خرید</Link> */}
    </div>
  );
};

export default Header;
