import React from "react";
import { Divider } from "@mui/material";

interface Props {
  cart_size: number;
}

const Navbar = ({ cart_size }: Props) => {
  return (
    <div>
      <div className="flex">
        <div>
          <div className="px-4 py-4 shrink relative">
            <div className="flex gap-2">
              <h1 className="text-2xl font-iranyekan_bold text-g1_5">
                سبد خرید
              </h1>
              <div className=" bg-g1_5 px-3 rounded-lg flex items-center justify-center">
                <span className="font-iransansnum  text-white text-xl">
                  {cart_size}
                </span>
              </div>
            </div>
            <div className="w-full bg-g1_5 h-[3.5px] rounded-tr-lg rounded-tl-lg shrink absolute bottom-0 left-0"></div>
          </div>
        </div>
      </div>
      <Divider className="" />
    </div>
  );
};

export default Navbar;
