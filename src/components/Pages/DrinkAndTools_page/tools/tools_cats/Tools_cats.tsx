import { MainCat_with_Specific_cats } from "@/types_validation/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  Main_cat: MainCat_with_Specific_cats;
}

const Tools_cat = ({ Main_cat }: Props) => {
  return (
    <div>
      <h1 className="text mb-4 font-iranyekan_bold text-2xl font-bold text-dark_2">
        {Main_cat.title}
      </h1>
      <div className="grid grid-cols-2 gap-3 p-3 max-md:grid-cols-1 max-md:place-items-center ">
        {Main_cat.Specific_cat.map((spcfic) => {
          return (
            <div key={spcfic.id} className="grow">
              <Link href={`/search/${spcfic.label}`} title={spcfic.title}>
                <div>
                  <Image
                    className="w-full max-w-[50rem] rounded-lg"
                    src={spcfic.hero_image}
                    width={600}
                    height={600}
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

export default Tools_cat;
