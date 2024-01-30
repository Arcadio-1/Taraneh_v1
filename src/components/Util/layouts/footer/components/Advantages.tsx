import React from "react";
import Original_products from "@/assets/images/footer/original-products.svg";
import Days_return from "@/assets/images/footer/days-return.svg";
import Cash_on_delivery from "@/assets/images/footer/cash-on-delivery.svg";
import Express_delivery from "@/assets/images/footer/express-delivery.svg";
import Support from "@/assets/images/footer/support.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type List = {
  src: StaticImport;
  title: string;
}[];

const Advantages = () => {
  const advantagesList: List = [
    { src: Original_products, title: "ضمانت اصل بودن کالا" },
    { src: Days_return, title: "هفت روز ضمانت بازگشت کالا" },
    { src: Cash_on_delivery, title: "امکان پرداخت در محل" },
    { src: Express_delivery, title: "امکان تحویل اکسپرس" },
    { src: Support, title: "۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-evenly gap-5">
      {advantagesList.map((advantage, index) => {
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={advantage.src}
              width={60}
              height={60}
              alt={advantage.title}
            />
            <span>{advantage.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Advantages;
