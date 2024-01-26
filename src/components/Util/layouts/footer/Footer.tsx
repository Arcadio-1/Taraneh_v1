import React from "react";
import LogoImage from "@/assets/images/footer/footer_logo.png";
import Original_products from "@/assets/images/footer/original-products.svg";
import Days_return from "@/assets/images/footer/days-return.svg";
import Cash_on_delivery from "@/assets/images/footer/cash-on-delivery.svg";
import Express_delivery from "@/assets/images/footer/express-delivery.svg";
import Support from "@/assets/images/footer/support.svg";
import Image from "next/image";
import InstagramIcon from "../../ui/icons/InstagramIcon";
import TwitterIcon from "../../ui/icons/TwitterIcon";
import LinkedinIcon from "../../ui/icons/LinkedinIcon";
import YoutubeIcon from "../../ui/icons/YoutubeIcon";
import Enamad from "@/assets/images/footer/enamad.png";
import Kasbokar from "@/assets/images/footer/kasbokar.png";
import Samandehi from "@/assets/images/footer/samandehi.jpg";
import ScrollToTopBtn from "./ScrollToTopBtn";

const Footer = () => {
  return (
    <div className="mt-5 flex flex-col gap-20 px-8 py-8 shadow-[0px_1px_5px_rgba(0,0,0,0.20)]">
      <div className="flex flex-col-reverse items-start justify-end gap-4  sm:flex-row sm:items-center sm:justify-between sm:gap-0">
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
        <ScrollToTopBtn />
      </div>
      <div className="flex flex-wrap items-center justify-evenly gap-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Original_products}
            width={60}
            height={60}
            alt="ضمانت اصل بودن کالا"
          />
          <span>ضمانت اصل بودن کالا</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Days_return}
            width={60}
            height={60}
            alt="هفت روز ضمانت بازگشت کالا"
          />
          <span>هفت روز ضمانت بازگشت کالا</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Cash_on_delivery}
            width={60}
            height={60}
            alt="امکان پرداخت در محل"
          />
          <span>امکان پرداخت در محل</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Express_delivery}
            width={60}
            height={60}
            alt="امکان تحویل اکسپرس"
          />
          <span>امکان تحویل اکسپرس</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Support}
            width={60}
            height={60}
            alt="۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ"
          />
          <span>۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-evenly gap-12">
        <div className="flex flex-col gap-3">
          <p className="text-xl">همراه ما باشید!</p>
          <div className="flex gap-6">
            <InstagramIcon classes="h-12 w-12 fill-dark_5" />
            <TwitterIcon classes="h-12 w-12 fill-dark_5" />
            <LinkedinIcon classes="h-12 w-12 fill-dark_5" />
            <YoutubeIcon classes="h-12 w-12 fill-dark_5" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className=" font-iranyekan_bold text-xl">
            با ثبت ایمیل, از جدید ترین ایمیل ها باخبر شوید
          </p>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="ایمیل شما"
              className="min-w-[20rem] rounded-lg bg-slate-100 p-4 font-iranyekan_bold text-lg"
            />
            <button className="rounded-lg bg-slate-300 px-6 py-4 font-iranyekan_bold text-lg text-white">
              ثبت
            </button>
          </div>
        </div>

        <div className="mr-auto flex items-center gap-3">
          <Image
            src={Enamad}
            alt="نماد الکترونیک"
            width={100}
            height={100}
            className="h-32 w-28"
          />
          <Image
            src={Samandehi}
            alt="نماد ساماندهی"
            width={100}
            height={100}
            className="h-32 w-28"
          />
          <Image
            src={Kasbokar}
            alt="نماد کسب و کار الکترونیک"
            width={100}
            height={100}
            className="h-32 w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
