import Image from "next/image";
import React from "react";
import EmptyOrderSvg from "@/assets/images/util/order-empty.svg";
const EmptyOrder = () => {
  return (
    <div className="grid items-center justify-center w-full">
      <div className="mx-auto w-full flex flex-col gap-2 items-center justify-center ">
        <Image
          src={EmptyOrderSvg}
          width={200}
          height={200}
          alt="سفارشی ندارید"
        />
        <p className="font-iranyekan_bold text-dark_4 text-lg">
          هنوز هیچ سفارشی ندادید
        </p>
      </div>
    </div>
  );
};

export default EmptyOrder;
