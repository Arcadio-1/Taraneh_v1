"use client";
import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import CartBankIcon from "@/components/Util/icons/CartBankIcon";
import CriditIcon from "@/components/Util/icons/CriditIcon";
import OrganazationCreditIcon from "@/components/Util/icons/OrganazationCreditIcon";
import PosIcon from "@/components/Util/icons/PosIcon";
import { Label } from "@/components_shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components_shadcn/ui/radio-group";
import React, { useState } from "react";

const payment_methods = [
  {
    method_value: "bank_cart",
    id: "0",
    // icon: <CartBankIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت اینترنتی",
    description: "پرداخت انلاین با تمامی کارت های بانکی",
  },
  {
    method_value: "pos",
    id: "1",
    // icon: <PosIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت در محل (با کارت بانکی)",
    description: "هنگام تحویل از طریق کارت‌های بانکی",
  },
  {
    method_value: "cridit",
    id: "2",
    // icon: <CriditIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت اعتباری ترانه پی",
    description: "الان بخر، بعدا پرداخت کن",
  },
  {
    method_value: "organazationCredit",
    id: "3",
    // icon: <OrganazationCreditIcon classes="h-10 w-10 fill-gray-500" />,
    label: "پرداخت با کارت اعتباری",
    description: "ویژه بانک‌ها، سازمان‌ها و شرکت‌ها",
  },
];
const Payment_method = () => {
  const [selected, setSelected] = useState<string>("");
  const [colapsToggole, setColapsToggole] = useState<boolean>(true);
  return (
    <div className="py-3 px-4 border rounded-lg">
      <h1>انتخاب روش پرداخت</h1>
      <RadioGroup
        className=" py-3"
        onValueChange={(e) => {
          setSelected(e);
        }}
      >
        {payment_methods.map((method, index) => {
          return (
            <div
              key={method.id}
              className={`border-b last:border-transparent flex items-start justify-end gap-4 px-2 py-6 ${
                index > 1 && colapsToggole && "hidden"
              }`}
            >
              <Label
                htmlFor={method.method_value}
                className={`flex cursor-pointer text-md peer-checked/${method.method_value}:text-sky-500`}
              >
                <div className="flex gap-5">
                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`text-xl font-iranyekan_bold ${
                        selected === method.method_value && "text-red-500"
                      }`}
                    >
                      {method.label}
                    </span>
                    <span className={`text-dark_5`}>{method.description}</span>
                  </div>
                  <div>
                    {method.method_value === "bank_cart" && (
                      <CartBankIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          selected === "bank_cart" && "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === "pos" && (
                      <PosIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          selected === "pos" && "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === "cridit" && (
                      <CriditIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          selected === "cridit" && "fill-red-500"
                        }`}
                      />
                    )}
                    {method.method_value === "organazationCredit" && (
                      <OrganazationCreditIcon
                        classes={`h-10 w-10 fill-gray-500 ${
                          selected === "organazationCredit" && "fill-red-500"
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
          className="text-lg flex items-start gap-3"
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
