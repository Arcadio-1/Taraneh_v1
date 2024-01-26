import Image from "next/image";
import React from "react";
import Link from "next/link";
import ArrowLongIcon, { Arrow } from "../../ui/icons/ArrowLongIcon";

export interface Hero_slide_type {
  link_url: string;
}
interface Props {
  link_url: string;
  bg_color?: string;
}
const LastSlide = ({ link_url, bg_color = "bg-white" }: Props) => {
  return (
    <div
      className={`relative  h-full w-[18rem] overflow-hidden p-2 shadow-md transition-all duration-150 hover:scale-[1.015] hover:shadow-lg max-xl:w-[16rem] max-md:w-[15rem] ${bg_color} flex items-center justify-center rounded-bl-xl rounded-tl-xl `}
    >
      <Link
        className="flex flex-col items-center justify-center gap-4"
        href={link_url}
      >
        <div className="rounded-full border border-g1_6 p-4">
          <ArrowLongIcon
            direction={Arrow.left}
            classes=" h-10 w-10 fill-g1_6"
          />
        </div>
        <span className="font-iranyekan_bold text-lg">مشاهده همه</span>
      </Link>
    </div>
  );
};

export default LastSlide;
