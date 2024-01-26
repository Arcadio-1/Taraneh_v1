import ReceiptIcon from "@/components/Util/ui/icons/ReceiptIcon";
import Link from "next/link";
import React from "react";

interface Props {
  order_id: string;
}

const Actions = ({ order_id }: Props) => {
  return (
    <div className="mr-auto px-6">
      <Link
        href={`/profile/order/${order_id}`}
        className="flex items-center gap-1 fill-g1_7 text-g1_7"
      >
        مشاهده فاکتور
        <ReceiptIcon clasess="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Actions;
