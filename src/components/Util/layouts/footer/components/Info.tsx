import Image from "next/image";
import React from "react";
import LogoImage from "@/assets/images/footer/footer_logo.png";

const Info = () => {
  return (
    <div className="flex flex-col gap-3">
      <Image
        className="max-w-xs"
        src={LogoImage}
        width={400}
        height={50}
        alt="کافه ترانه"
      />
      <div className="flex flex-col gap-4 text-xl text-dark_4 sm:flex-row">
        <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
        <span className="hidden sm:inline">|</span>
        <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
      </div>
    </div>
  );
};

export default Info;
