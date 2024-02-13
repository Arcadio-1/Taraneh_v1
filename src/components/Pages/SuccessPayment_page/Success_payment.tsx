"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PayMethod } from "@prisma/client";
import Image from "next/image";
import Success_payment_image from "@/assets/images/util/success_payment.png";
interface Props {
  tracking_code: string;
  payment_method: PayMethod | undefined;
}

const Success_payment = ({ tracking_code, payment_method }: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="mx-auto my-5 flex w-full max-w-4xl items-center justify-between rounded-lg border px-6  py-4">
      <div className="flex flex-col items-start gap-3 font-iranyekan_bold">
        <h1 className="pb-2 font-iranyekan_bold text-xl text-green-600">
          سفارش شما با موفقیت ثبت گردید.
        </h1>
        <div className="text-md flex items-center gap-2">
          <span className="text-dark_6">شماره سفارش</span>
          <span>{tracking_code}</span>
        </div>
        <div className="text-md flex items-center gap-2">
          <span className="text-dark_6">روش پرداخت</span>
          <span>
            {payment_method === PayMethod.BANK_CART ? "پرداخت آنلاین" : ""}
            {payment_method === PayMethod.CRIDIT ? "پرداخت اعتباری" : ""}
            {payment_method === PayMethod.ORGANAZATION_CRIDIT
              ? "پرداخت سازمانی "
              : ""}

            {payment_method === PayMethod.POS ? "پرداخت در محل " : ""}
          </span>
        </div>
        <div className="flex items-center gap-3 pt-4 font-iransansbold">
          <Link
            href={`/profile/order/${tracking_code}`}
            className="text-md rounded-lg bg-g1_5 px-3 py-3 text-white"
          >
            ویرایش و پیگیری سفارش
          </Link>
          <Link href={"/"} className="text-md rounded-lg px-3 py-3 text-g1_5">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={Success_payment_image}
          width={100}
          height={100}
          alt="success payment"
        />
      </div>
    </div>
  );
};

export default Success_payment;
