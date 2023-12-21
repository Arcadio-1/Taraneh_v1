import { z } from "zod";
import { convert_to_en_number } from "./translateNumbers";
import { Recommendation } from "@prisma/client";

export const phoneSchame = z.object({
  phone: z.union([
    z.string().min(10, {
      message: "لطفا شماره موبایل خود را وارد کنید مثال(09120001122)",
    }),
    z.string().regex(/^\d{10}$|[۰۱۲۳۴۵۶۷۸۹]{10}$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
      message: "لطفا شماره موبایل خود را با اعداد انگلیسی وارد کنید",
    }),
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
    .min(10, { message: "کد ملی وارد شده صحیح نیست" })
    .regex(/^\d{10}$|[۰۱۲۳۴۵۶۷۸۹]{10}$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
      message: "لطفا از اعداد انگلیسی برای وارد کردن کد ملی استفاده کنید",
    })
    .refine(
      (value) => {
        const fixedValue = convert_to_en_number(value);
        const check = +fixedValue[9];
        const sum =
          fixedValue
            .split("")
            .slice(0, 9)
            .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
        const isChecked = sum < 2 ? check === sum : check + sum === 11;
        return isChecked;
      },
      { message: "کد ملی وارد شده با الگو کد ملی مغایرت دارد" }
    ),
});

export const AddressSchame = z.object({
  state_id: z.string().min(24, { message: "لطفا استان خود را انتخاب کنید" }),
  city_id: z
    .string()
    .min(24, { message: "لطفا ابتدا استان و سپس شهر خود را انتخاب کنید." }),
  zip_code: z
    .string()
    .min(10, { message: "لطفا کد پستی را وارد کنید" })
    .regex(/^\d{10}$|[۰۱۲۳۴۵۶۷۸۹]{10}$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
      message: "لطفا کد پستی را با اعداد انگلیسی وارد کنید",
    }),
  house_number: z
    .string()
    .min(1, { message: "لطفا پلاک را وارد کنید" })
    .regex(/^\d*$|[۰۱۲۳۴۵۶۷۸۹]*$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
      message: "لطفا پلاک را با اعداد انگلیسی وارد کنید",
    }),
  address: z
    .string()
    .min(6, { message: "آدرس وارد شده صحیح نیست" })
    .regex(
      /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی ۰۱۲۳۴۵۶۷۸۹ 1234567890 ٠١٢٣٤٥٦٧٨٩]+$/,
      {
        message: "لطفا ادرس خود را به زبان فارسی وارد کنید",
      }
    ),
});

export const emailSchame = z.object({
  email: z
    .string()
    .toLowerCase()
    .min(7, { message: "لطفا ایمیل خود را به صورت کامل وارد کنید" })
    .regex(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      {
        message: "لطفا ایمیل خود را به شکل صحیح  (abc@gmail.com) وارد کنید",
      }
    ),
});
export const commentSchame = z.object({
  product_id: z.string(),
  date: z.date(),
  userId: z.string(),
  buyer: z.boolean(),
  recommendation: z.nativeEnum(Recommendation),
  like: z.array(z.object({ userId: z.string() })),
  dislike: z.array(z.object({ userId: z.string() })),
  parent: z.string().or(z.null()),
  title: z
    .string()
    .min(2, { message: "لطفا عنوان نظر خود را مشخص کنید " })
    .max(100, { message: "لطفا عنوان نظر خود بصورت کوتاه مشخص کنید " }),
  text: z
    .string()
    .min(2, { message: "لطفا دیدگاه خود را بنویسید " })
    .max(1000, { message: "لطفا دیدگاه خود را کوتاه تر بنویسید " }),
  rate: z
    .number()
    .min(10, { message: "لطفا امتیاز خود را وارد کنید" })
    .max(50, { message: "امتیاز وارد شده صحیح نیست" }),
});
