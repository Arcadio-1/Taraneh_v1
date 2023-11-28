"use client";
import React, { useEffect, useState } from "react";
import LogoImage from "@/assets/images/footer/footer_logo.png";
import Original_products from "@/assets/images/footer/original-products.svg";
import Days_return from "@/assets/images/footer/days-return.svg";
import Cash_on_delivery from "@/assets/images/footer/cash-on-delivery.svg";
import Express_delivery from "@/assets/images/footer/express-delivery.svg";
import Support from "@/assets/images/footer/support.svg";
import Image from "next/image";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";
import LinkedinIcon from "../icons/LinkedinIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import Enamad from "@/assets/images/footer/enamad.png";
import Kasbokar from "@/assets/images/footer/kasbokar.png";
import Samandehi from "@/assets/images/footer/samandehi.jpg";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { usePathname } from "next/navigation";

const footerDiablerPaths: string[] = [
  "/shipping",
  "/payment",
  "/successPayment",
  "/profile",
];

const Footer = () => {
  const pathname = usePathname();
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
    footerDiablerPaths.map((path) => {
      if (path === pathname) {
        setMount(false);
      }
    });
  }, [pathname]);
  return (
    <>
      {mount ? (
        <div className="px-8 py-8 flex flex-col gap-20 shadow-[0px_1px_5px_rgba(0,0,0,0.20)] mt-5">
          <div className="flex items-start flex-col-reverse gap-4 justify-end  sm:justify-between sm:flex-row sm:items-center sm:gap-0">
            <div className="flex flex-col gap-3">
              <Image
                className="max-w-xs"
                src={LogoImage}
                width={400}
                height={50}
                alt="کافه ترانه"
              />
              <div className="flex gap-4 text-xl text-dark_4 flex-col sm:flex-row">
                <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
                <span className="hidden sm:inline">|</span>
                <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
              </div>
            </div>
            <ScrollToTopBtn />
          </div>
          <div className="flex flex-wrap gap-5 items-center justify-evenly">
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
          <div className="flex items-center justify-evenly gap-12 flex-wrap">
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
              <p className=" text-xl font-iranyekan_bold">
                با ثبت ایمیل, از جدید ترین ایمیل ها باخبر شوید
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="ایمیل شما"
                  className="bg-slate-100 p-4 rounded-lg min-w-[20rem] text-lg font-iranyekan_bold"
                />
                <button className="bg-slate-300 text-white py-4 px-6 rounded-lg text-lg font-iranyekan_bold">
                  ثبت
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mr-auto">
              <Image
                src={Enamad}
                alt="نماد الکترونیک"
                width={100}
                height={100}
                className="w-28 h-32"
              />
              <Image
                src={Samandehi}
                alt="نماد ساماندهی"
                width={100}
                height={100}
                className="w-28 h-32"
              />
              <Image
                src={Kasbokar}
                alt="نماد کسب و کار الکترونیک"
                width={100}
                height={100}
                className="w-24 h-32"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
