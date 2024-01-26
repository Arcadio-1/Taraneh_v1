import DotIcon from "@/components/Util/ui/icons/DotIcon";
import { Day, faDateObjectGenerator } from "@/util_functions/calender";
import React from "react";

interface Props {
  createdAt: Date;
  Order_id: string;
}

const HeadOrderDetials = ({ Order_id, createdAt }: Props) => {
  const faDateObject: Day = faDateObjectGenerator(
    createdAt.toLocaleDateString("fa-IR"),
  );
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex gap-2">
        <label className="text-dark_5">کد پیگیری سفارش</label>
        <span className="font-bold text-dark_1">{Order_id}</span>
      </div>
      <DotIcon classes=" h-2 w-2 fill-dark_5" />
      <div className="flex gap-2">
        <label className="text-dark_5"> تاریخ ثبت سفارش</label>
        <p className="flex gap-1 font-bold text-dark_1">
          <span className="font-iransansnum">{`${faDateObject.day} `}</span>
          <span className="font-iranyekan">{`${faDateObject.month_name}`}</span>
          <span className="font-iransansnum">{`${faDateObject.year}`}</span>
        </p>
      </div>
    </div>
  );
};

export default HeadOrderDetials;
