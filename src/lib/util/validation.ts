import { z } from "zod";
import { fixNumbers } from "./translateNumbers";

export const phoneSchame = z.object({
  phone: z.union([
    z.string().regex(/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/, {
      message: "شماره موبایل وارد شده صحیح نمیباشد مثال (09120001122)",
    }),
    z
      .string()
      .regex(
        /۰۹(۱[۰۱۲۳۴۵۶۷۸۹]|۳[۱۲۳۴۵۶۷۸۹]|۰[۱۲۳۴۵۶۷۸۹]|۲[۱۲۳۴۵۶۷۸۹])-?[۰۱۲۳۴۵۶۷۸۹]{3}-?[۰۱۲۳۴۵۶۷۸۹]{4}$/,
        { message: "(شماره موبایل وارد شده صحیح نمیباشد مثال (09120001122" }
      ),
  ]),
});

export const personalInfoFormSchame = z.object({
  name: z
    .string()
    .min(2, { message: "لطفا نام خود را به زبان فارسی وارد کنید" })
    .regex(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/, {
      message: "لطفا نام خود را به زبان فارسی وارد کنید",
    }),
  family: z
    .string()
    .min(2, { message: "لطفا نام خانوادگی خود را به زبان فارسی وارد کنید" })
    .regex(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/, {
      message: "لطفا نام خانوادگی خود را به زبان فارسی وارد کنید",
    }),
  code_meli: z
    .string()
    .min(10, { message: "%کد ملی وارد شده صحیح نیست" })
    .regex(/^\d{10}$|[۰۱۲۳۴۵۶۷۸۹]{10}$/, {
      message: "کد ملی وارد شده صحیح نیست#",
    })
    .refine(
      (value) => {
        const fixedValue = fixNumbers(value);
        const check = +fixedValue[9];
        const sum =
          fixedValue
            .split("")
            .slice(0, 9)
            .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
        const isChecked = sum < 2 ? check === sum : check + sum === 11;
        return isChecked;
      },
      { message: "کد ملی وارد شده صحیح نیست" }
    ),
});
