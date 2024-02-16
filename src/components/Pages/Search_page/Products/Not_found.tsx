import InfoIcon from "@/components/Util/ui/icons/InfoIcon";
import Image from "next/image";
import React from "react";
import Notfound_Svg from "@/assets/images/util/not-found.svg";

const Not_found = () => {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col  items-center justify-center gap-6 p-8">
      <Image
        src={Notfound_Svg}
        width={200}
        height={80}
        alt="کالایی با این مشخصات پیدا نکردیم"
      />
      <div className="flex w-full grow items-start gap-4 rounded-lg border px-4 py-6">
        <InfoIcon className="h-8 w-8 fill-orange-300" />
        <div className="flex flex-col gap-3">
          <h1 className="font-iranyekan_bold text-xl">
            کالایی با این مشخصات پیدا نکردیم
          </h1>
          <h2 className="text-md font-iranyekan_bold">
            پیشنهاد می‌کنیم فیلترها را تغییر دهید
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Not_found;
