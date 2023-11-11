import ReceiptIcon from "@/components/Util/icons/ReceiptIcon";
import Link from "next/link";
import React from "react";

interface Props {
  order_id: string;
}

const Actions = ({ order_id }: Props) => {
  return (
    <div className="px-6 mr-auto">
      <Link
        href={`/profile/order/${order_id}`}
        className="text-g1_7 flex items-center fill-g1_7 gap-1"
      >
        مشاهده فاکتور
        <ReceiptIcon clasess="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Actions;
