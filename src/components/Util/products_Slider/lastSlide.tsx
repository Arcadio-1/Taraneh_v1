import Image from "next/image";
import React from "react";
import Link from "next/link";
import ArrowLongIcon, { Arrow } from "../icons/ArrowLongIcon";

export interface Hero_slide_type {
  link_url: string;
}
interface Props {
  link_url: string;
  bg_color: string;
}
const LastSlide = ({ link_url, bg_color }: Props) => {
  return (
    <div
      className={`relative bg-light_1 overflow-hidden p-2 shadow-md h-full w-[18rem] max-xl:w-[16rem] max-md:w-[15rem] transition-all duration-150 hover:scale-[1.015] hover:shadow-lg ${bg_color} rounded-bl-xl rounded-tl-xl flex items-center justify-center `}
    >
      <Link
        className="flex items-center flex-col justify-center gap-4"
        href={link_url}
      >
        <div className="rounded-full border p-4 border-g1_6">
          <ArrowLongIcon
            direction={Arrow.left}
            classes=" h-10 w-10 fill-g1_6"
          />
        </div>
        <span className="font-iranyekan_bold text-xl">مشاهده همه</span>
      </Link>
    </div>
  );
};

export default LastSlide;
