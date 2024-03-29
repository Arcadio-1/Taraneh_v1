"use client";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import CartBankIcon from "@/components/Util/ui/icons/CartBankIcon";
import CriditIcon from "@/components/Util/ui/icons/CriditIcon";
import OrganazationCreditIcon from "@/components/Util/ui/icons/OrganazationCreditIcon";
import PosIcon from "@/components/Util/ui/icons/PosIcon";
import { Label } from "@/components/Util/shadcn/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/Util/shadcn/ui/radio-group";
import { PayMethod } from "@prisma/client";
import React, { useState } from "react";

const payment_methods = [
  {
    method_value: PayMethod.BANK_CART,
    id: "0",
    // icon: <CartBankIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت اینترنتی",
    description: "پرداخت انلاین با تمامی کارت های بانکی",
  },
  {
    method_value: PayMethod.POS,
    id: "1",
    // icon: <PosIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت در محل (با کارت بانکی)",
    description: "هنگام تحویل از طریق کارت‌های بانکی",
  },
  {
    method_value: PayMethod.CRIDIT,
    id: "2",
    // icon: <CriditIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت اعتباری ترانه پی",
    description: "الان بخر، بعدا پرداخت کن",
  },
  {
    method_value: PayMethod.ORGANAZATION_CRIDIT,
    id: "3",
    // icon: <OrganazationCreditIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت با کارت اعتباری",
    description: "ویژه بانک‌ها، سازمان‌ها و شرکت‌ها",
  },
];

interface Props {
  onPaymentSet: (method: PayMethod) => void;
  paymentMethod: PayMethod;
}
const Payment_method = ({ onPaymentSet, paymentMethod }: Props) => {
  const [colapsToggole, setColapsToggole] = useState<boolean>(true);
  return (
    <div className="rounded-lg border px-4 py-3">
      <h1>انتخاب روش پرداخت</h1>
      <RadioGroup
        className=" py-3"
        onValueChange={(e: PayMethod) => {
          onPaymentSet(e);
        }}
      >
        {payment_methods.map((method, index) => {
          return (
            <div
              key={method.id}
              className={`flex items-start justify-end gap-4 border-b px-2 py-6 last:border-transparent ${
                index > 1 && colapsToggole && "hidden"
              }`}
            >
              <Label
                htmlFor={method.method_value}
                className={`text-md flex cursor-pointer peer-checked/${method.method_value}:text-sky-500`}
              >
                <div className="flex gap-5">
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`font-iranyekan_bold text-xl ${
                        paymentMethod === method.method_value && "text-red-500"
                      }`}
                    >
                      {method.label}
                    </span>
                    <span className={`text-dark_5`}>{method.description}</span>
                  </div>
                  <div>
                    {method.method_value === PayMethod.BANK_CART && (
                      <CartBankIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          paymentMethod === PayMethod.BANK_CART &&
                          "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === PayMethod.POS && (
                      <PosIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          paymentMethod === PayMethod.POS && "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === PayMethod.CRIDIT && (
                      <CriditIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          paymentMethod === PayMethod.CRIDIT && "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === PayMethod.ORGANAZATION_CRIDIT && (
                      <OrganazationCreditIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          paymentMethod === PayMethod.ORGANAZATION_CRIDIT &&
                          "fill-red-500"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </Label>
              <RadioGroupItem
                value={method.method_value}
                id={method.method_value}
                className={`fill-red-500 `}
              />
            </div>
          );
        })}
      </RadioGroup>
      {colapsToggole && (
        <button
          className="flex items-start gap-3 text-lg"
          onClick={() => setColapsToggole(false)}
        >
          <ArrowIcon direction={Arrow.down} classes="h-4 w-4 fill-gray-500" />
          مشاهده روش های دیگر
        </button>
      )}
    </div>
  );
};

export default Payment_method;
