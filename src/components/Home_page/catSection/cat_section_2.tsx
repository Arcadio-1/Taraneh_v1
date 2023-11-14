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
      <h1 className="mb-5 text-2xl bg-slate-50 w-full py-4 bg-opacity-40 text-center font-iranyekan_bold">
        خرید بر اساس دسته بندی
      </h1>
      <div className="w-full px-2 flex flex-col-reverse items-center justify-center gap-4">
        {cats.map((mainCat) => {
          return (
            <div
              className="flex gap-4 justify-center flex-wrap items-stretch "
              key={mainCat.id}
            >
              {mainCat.Specific_cat.map((specific) => {
                return (
                  <div
                    className="rounded-lg bg-white backdrop-blur-sm bg-opacity-40 border-dark_6 border-opacity-10 hover:border-transparent p-2 transition-all duration-150 hover:scale-[1.015] hover:shadow-lg flex items-center grow flex-col justify-between gap-4"
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
                      <h2 className="font-iranyekan_bold text-dark-1 text-xl">
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
    </div>
  );
};

export default Cat_section_2;
