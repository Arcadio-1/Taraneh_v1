import InfoIcon from "@/components/Util/icons/InfoIcon";
import Image from "next/image";
import React from "react";
import Notfound_Svg from "@/assets/images/util/not-found.svg";

const Not_found = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6  w-full max-w-2xl mx-auto p-8">
      <Image
        src={Notfound_Svg}
        width={200}
        height={80}
        alt="کالایی با این مشخصات پیدا نکردیم"
      />
      <div className="flex items-start gap-4 py-6 px-4 border rounded-lg grow w-full">
        <InfoIcon classes="w-8 h-8 fill-orange-300" />
        <div className="flex flex-col gap-3">
          <h1 className="font-iranyekan_bold text-xl">
            کالایی با این مشخصات پیدا نکردیم
          </h1>
          <h2 className="font-iranyekan_bold text-md">
            پیشنهاد می‌کنیم فیلترها را تغییر دهید
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Not_found;
