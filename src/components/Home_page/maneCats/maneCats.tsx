import { MainCatsWithSpecificCats } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

const ManeCats = ({ cats }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
      {cats.map((mainCat) => {
        return (
          <Link
            href={`/main/${mainCat.label}`}
            className="grow flex items-center justify-evenly bg-g1_1 bg-opacity-60 rounded-xl p-5"
            key={mainCat.id}
          >
            <h1 className="text-light_1 text-4xl">{mainCat.title}</h1>
            <Image
              src={mainCat.image}
              alt={mainCat.title}
              width={150}
              height={150}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ManeCats;
