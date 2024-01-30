import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Enamad from "@/assets/images/footer/enamad.png";
import Kasbokar from "@/assets/images/footer/kasbokar.png";
import Samandehi from "@/assets/images/footer/samandehi.jpg";
import React from "react";
import Image from "next/image";

type List = {
  src: StaticImport;
  title: string;
}[];

const Badges = () => {
  const badgesList: List = [
    { src: Enamad, title: "نماد الکترونیک" },
    { src: Samandehi, title: "نماد ساماندهی" },
    { src: Kasbokar, title: "نماد کسب و کار الکترونیک" },
  ];
  return (
    <div className="mr-auto flex items-center gap-3">
      {badgesList.map((badge, index) => {
        return (
          <Image
            key={index}
            src={badge.src}
            alt={badge.title}
            width={100}
            height={100}
            className="h-32 w-28"
          />
        );
      })}
    </div>
  );
};

export default Badges;
