import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Root = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p>سفارش های من</p>
        </div>
        <div>
          <Link href={"profile/orders"} className="flex items-center">
            مشاهده همه
            <svg viewBox="0 0 32 32" className="w-8 h-8">
              <line
                className="fill-none stroke-gray-900 stroke-2 [stroke-linecap:round]"
                x1="11"
                x2="20"
                y1="16"
                y2="7"
              />
              <line
                className="fill-none stroke-gray-900 stroke-2 [stroke-linecap:round]"
                x1="20"
                x2="11"
                y1="25"
                y2="16"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Root;
