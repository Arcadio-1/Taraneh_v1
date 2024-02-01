import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

const SpecificCats = async ({ cats }: Props) => {
  return (
    <div className="bg-[url('/image/coffee_background_2.jpg')] bg-cover bg-center bg-no-repeat">
      <h1 className="mb-5 w-full bg-g1_7 bg-opacity-60 py-4 text-center font-iranyekan_bold text-2xl text-white">
        خرید بر اساس دسته بندی
      </h1>
      <div className="flex flex-col items-center justify-center gap-7 py-6">
        <div className="flex w-full flex-col-reverse items-center justify-center gap-4 px-2">
          {cats.map((mainCat) => {
            return (
              <div
                className="flex flex-wrap items-stretch justify-center gap-4 "
                key={mainCat.id}
              >
                {mainCat.Specific_cat.map((specific) => {
                  return (
                    <div
                      className="flex grow flex-col items-center justify-between gap-4 rounded-lg border-dark_6 border-opacity-10 bg-white bg-opacity-70 px-4 py-2 backdrop-blur-sm transition-all duration-150 hover:scale-[1.015] hover:border-transparent hover:shadow-lg"
                      key={specific.id}
                    >
                      <Link
                        className="flex h-full flex-col items-center justify-between gap-2"
                        href={`/search/${specific.label}`}
                      >
                        <Image
                          src={specific.single_image}
                          width={100}
                          height={100}
                          alt={specific.title}
                        />
                        <h2 className="font-iranyekan_bold text-xl text-dark_1">
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
    </div>
  );
};

export default SpecificCats;
