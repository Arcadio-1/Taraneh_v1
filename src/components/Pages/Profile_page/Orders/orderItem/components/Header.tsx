import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import BoxingIcon from "@/components/Util/ui/icons/BoxingIcon";
import { OrderStatus } from "@prisma/client";
import React from "react";

interface Props {
  status: OrderStatus;
}

const Header = ({ status }: Props) => {
  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <BoxingIcon
          classes={`h-10 w-10 fill-white
          ${status === OrderStatus.IN_PROCESS && "bg-g1_6"}
          ${status === OrderStatus.NOT_CONFIRMED && "bg-g1_6"}
          ${status === OrderStatus.ON_DELIVERY && "bg-g1_6"}
          ${status === OrderStatus.DELIVERED && "bg-success"}
          ${status === OrderStatus.CANCELED && "bg-g1_5"}
          ${status === OrderStatus.REJECTED && "bg-g1_5"}
         rounded-full p-[2px] `}
        />
        <span className="font-iranyekan_bold text-xl">
          {status === OrderStatus.IN_PROCESS && " در حال پردازش"}
          {status === OrderStatus.NOT_CONFIRMED && " در حال پردازش"}
          {status === OrderStatus.DELIVERED && "تحویل شده"}
          {status === OrderStatus.CANCELED && "لغو شده"}
          {status === OrderStatus.ON_DELIVERY && "در حال ارسال"}
          {status === OrderStatus.REJECTED && "مرجوع شده"}
        </span>
      </div>
      <ArrowIcon direction={Arrow.left} classes="h-6 w-6" />
    </div>
  );
};

export default Header;
