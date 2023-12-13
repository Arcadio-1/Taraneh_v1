import Image from "next/image";
import React from "react";
import Link from "next/link";
import Amazing from "@/assets/images/Amazings.svg";
export interface Hero_slide_type {
  title?: string;
  image_url: string;
  link_url: string;
}
interface Props {
  hero: Hero_slide_type;
  bg_color: string;
}
const HeroSlide = ({
  hero: { image_url, title, link_url },
  bg_color,
}: Props) => {
  return (
    <div
      className={`relative h-full ${bg_color} flex items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-evenly h-full">
        {title && (
          <h1 className="text-[1.5rem] text-gray-50 ml-auto font-iransansbold">
            {title}
          </h1>
        )}
        {!title && (
          <Image
            src={Amazing}
            height={80}
            width={80}
            alt={"پیشنهاد شگفت انگیز"}
          />
        )}
        <Image
          src={image_url}
          height={100}
          width={100}
          alt={title || "پیشنهاد شگفت انگیز"}
        />
        <Link
          className="text-[1.4rem] font-iransans text-gray-50 flex items-center hover:text-red-400 hover:fill-red-400"
          href={link_url}
        >
          مشاهده همه
          <svg viewBox="0 0 96 96" className="h-6 w-6">
            <path
              className="fill-gray-50"
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HeroSlide;
