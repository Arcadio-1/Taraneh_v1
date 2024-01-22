import { MainCat_with_Specific_cats } from "@/types_validation/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  Main_cat: MainCat_with_Specific_cats;
}

const Drinks_cat = ({ Main_cat }: Props) => {
  return (
    <div>
      <h1 className="text mb-4 font-iranyekan_bold text-2xl font-bold text-dark_2">
        {Main_cat.title}
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3 p-3 ">
        {Main_cat.Specific_cat.map((spcfic) => {
          return (
            <div key={spcfic.id} className="grow">
              <Link href={`/search/${spcfic.label}`} title={spcfic.title}>
                <div className="bg-red-200">
                  <Image
                    className="w-full rounded-lg"
                    src={spcfic.hero_image}
                    width={300}
                    height={300}
                    alt={spcfic.title}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Drinks_cat;
