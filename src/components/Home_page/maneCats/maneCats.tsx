import { MainCatsWithSpecificCats } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

const ManeCats = ({ cats }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-3 px-4 justify-center py-4">
      {cats.map((mainCat) => {
        return (
          <Link
            href={`/${mainCat.label}`}
            className="grow w-full flex items-center justify-evenly p-5 max-w-2xl rounded-lg bg-white backdrop-blur-sm bg-opacity-10"
            key={mainCat.id}
          >
            <h1 className="text-dark_1 text-4xl">{mainCat.title}</h1>
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
