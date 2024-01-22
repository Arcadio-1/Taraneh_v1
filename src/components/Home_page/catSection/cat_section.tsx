import { prisma } from "@/lib/db/prisma";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Image from "next/image";
import React from "react";
import Cat_section_list from "./cat_section_list";

const Cat_section = async () => {
  const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
    include: { Specific_cat: true },
  });
  return (
    <div className="flex flex-col gap-3 bg-g3_3 p-4 ">
      {cats.map((mainCat) => {
        return (
          <div key={mainCat.id} className="flex">
            <div className="shrink rounded-full p-8">
              <Image
                src={mainCat.image}
                alt={mainCat.label}
                width={100}
                height={100}
              />
            </div>
            <Cat_section_list specificList={mainCat.Specific_cat} />
          </div>
        );
      })}
    </div>
  );
};

export default Cat_section;
