import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

const ManeCats = ({ cats }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-4 md:flex-row md:items-stretch">
      {cats.map((mainCat) => {
        return (
          <Link
            href={`/${mainCat.label}`}
            className="flex w-full max-w-2xl grow items-center justify-evenly rounded-lg bg-white bg-opacity-10 p-5 backdrop-blur-sm"
            key={mainCat.id}
          >
            <h1 className="text-4xl text-dark_1">{mainCat.title}</h1>
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
