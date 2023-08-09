import { Main_cat } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cat: Main_cat;
}

const Item = ({ cat }: Props) => {
  return (
    <div className="grow">
      <Link title={cat.title} href={`main/${cat.label}`}>
        <div className="flex justify-around items-center gap-2 bg-g1_1 rounded-lg">
          <div className="flex items-center">
            <span className="text-[1.8rem] font-iranyekan_bold text-gray-50">
              {cat.title}
            </span>
            <svg viewBox="0 0 96 96" className="h-8 w-8">
              <path
                className="fill-gray-50"
                d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              />
            </svg>
          </div>
          <Image
            src={cat.image}
            alt={cat.title}
            width={200}
            height={200}
            className="h-52 w-52 object-contain p-3"
          />
        </div>
      </Link>
    </div>
  );
};

export default Item;
