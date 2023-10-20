import OrdersIcon from "@/components/Profile_page/navigation/icons/OrdersIcon";
import GuaranteeIcon from "@/components/Util/icons/GuaranteeIcon";
import ShippingIcon from "@/components/Util/icons/ShippingIcon";
import { DotIcon } from "lucide-react";
import React from "react";

const Prod_status = () => {
  return (
    <div className=" flex flex-col justify-start items-start gap-2">
      <div className="flex items-center gap-4">
        <OrdersIcon className="w-8 h-8 stroke-cyan-600" />
        <p className="font-iranyekan_bold text-lg">موجود در انبار فروشگاه</p>
      </div>
      <ul className="flex flex-col gap-0">
        <li className="flex items-center gap-2">
          <div className="relative">
            <DotIcon className="text-cyan-600 p-0 m-0" height={20} width={20} />
            <span className="absolute top-0 left-1/2 w-[.6px] h-[calc(50%-2.5px)] bg-gray-400 translate-x-[-50%]"></span>
            <span className="absolute bottom-0 left-1/2 w-[.6px] h-[calc(50%-2.5px)] bg-gray-400 translate-x-[-50%]"></span>
          </div>
          <div className="flex items-center gap-1">
            <GuaranteeIcon classess="h-5 w-5 fill-dark_4" />
            <p className="text-sm">گارانتی اصالت و سلامت فیزیکی کالا</p>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <div className="relative">
            <DotIcon className="text-cyan-600 p-0 m-0" height={20} width={20} />
            <span className="absolute top-0 left-1/2 w-[.6px] h-[calc(50%-2.5px)] bg-gray-400 translate-x-[-50%]"></span>
            <span className="absolute bottom-0 left-1/2 w-[.6px] h-[calc(50%-2.5px)] bg-gray-400 translate-x-[-50%]"></span>
          </div>
          <div className="flex items-center gap-1">
            <ShippingIcon classes="h-5 w-5 fill-red-600" />
            <p className="text-sm">ارسال کافه ترانه</p>
          </div>
        </li>
        <li className="flex items-center gap-2">
          <div className="relative">
            <DotIcon className="text-cyan-600 p-0 m-0" height={20} width={20} />
            <span className="absolute top-0 left-1/2 w-[.6px] h-[calc(50%-2.5px)] bg-gray-400 translate-x-[-50%]"></span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-5 w-5 fill-blue-800" viewBox="0 0 24 24">
              <path d="M22 5h-2v2h2V5z"></path>
              <path
                fillRule="evenodd"
                d="M15 15h6v-2h-6a1 1 0 110-2h5V9h-6a1 1 0 110-2h4V5H7a7 7 0 000 14h11v-2h-3a1 1 0 110-2zm-3-3a5 5 0 10-10 0 5 5 0 0010 0z"
                clipRule="evenodd"
              ></path>
              <path d="M21.5 9H24v2h-2.5V9zM21.5 17H19v2h2.5v-2z"></path>
              <path
                fillRule="evenodd"
                d="M7 12V9.75H5.5v3c0 .414.336.75.75.75h3V12H7z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="text-sm">ارسال امروز (فعلا در شهر تهران و کرج)</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Prod_status;
