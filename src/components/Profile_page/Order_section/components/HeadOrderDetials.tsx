import DotIcon from "@/components/Util/icons/DotIcon";
import { Day, faDateObjectGenerator } from "@/lib/util/calender";
import React from "react";

interface Props {
  createdAt: Date;
  Order_id: string;
}

const HeadOrderDetials = ({ Order_id, createdAt }: Props) => {
  const faDateObject: Day = faDateObjectGenerator(
    createdAt.toLocaleDateString("fa-IR")
  );
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex gap-2">
        <label className="text-dark_5">کد پیگیری سفارش</label>
        <span className="text-dark_1 font-bold">{Order_id}</span>
      </div>
      <DotIcon classes=" h-2 w-2 fill-dark_5" />
      <div className="flex gap-2">
        <label className="text-dark_5"> تاریخ ثبت سفارش</label>
        <p className="flex gap-1 text-dark_1 font-bold">
          <span className="font-iransansnum">{`${faDateObject.day} `}</span>
          <span className="font-iranyekan">{`${faDateObject.month_name}`}</span>
          <span className="font-iransansnum">{`${faDateObject.year}`}</span>
        </p>
      </div>
    </div>
  );
};

export default HeadOrderDetials;
