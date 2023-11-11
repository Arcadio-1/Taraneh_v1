import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

const Cat_section_2 = async ({ cats }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 py-6">
      <h1 className="mb-5 text-xl bg-slate-50 w-full py-4 bg-opacity-40 text-center font-iranyekan_bold">
        خرید بر اساس دسته بندی
      </h1>
      {cats.map((mainCat) => {
        return (
          <div className="flex gap-2" key={mainCat.id}>
            {mainCat.Specific_cat.map((specific) => {
              return (
                <div
                  className="relative p-2 transition-all duration-150 hover:scale-[1.015] hover:shadow-lg  flex items-center  bg-opacity-40 rounded-lg  flex-col justify-between gap-4"
                  key={specific.id}
                >
                  <Link
                    className="flex flex-col gap-2 items-center justify-between h-full"
                    href={`/search/${specific.label}`}
                  >
                    <Image
                      src={specific.single_image}
                      width={100}
                      height={100}
                      alt={specific.title}
                    />
                    <h2 className="font-iranyekan text-dark_2 text-xl">
                      {specific.title}
                    </h2>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Cat_section_2;
