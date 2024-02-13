import { z } from "zod";
import { convert_to_en_number } from "../util_functions/translateNumbers";
import { OrderStatus, PayMethod, Recommendation } from "@prisma/client";

export const PhoneSchame = z.string().refine(
  (value) => {
    const converted_phone_number = convert_to_en_number(value);
    const regexTest =
      /09(1[0-9]|0[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/.test(
        converted_phone_number,
      );
    return regexTest;
  },
  { message: "شماره موبایل وارد شده صحیح نیست" },
);

export const PasswordScham = z
  .string()
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\w\s\d@$!%*#?&@+.-آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی1234567890٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹]{6,32}$/,
    {
      message:
        "رمز عبور باید حداقل 6 رقم و حداقل یک حروف و یک عدد انگلیسی باشد",
    },
  );

export const OtpNumberScheme = z.string().refine(
  (value) => {
    const convertedOtpNumber = convert_to_en_number(value);
    const regexTest = /^\d{5}$/.test(convertedOtpNumber);
    return regexTest;
  },
  { message: "رمز یک بار مصرف وارد شده صحیح نیست" },
);

export const PersonalInfoCode_meliSchame = z
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
    { message: "کد ملی وارد شده با الگو کد ملی مغایرت دارد" },
  );

export const PersonalInfoNameSchame = z
  .string()
  .min(2, { message: "لطفا نام خود را به زبان فارسی وارد کنید" })
  .regex(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/, {
    message: "لطفا نام خود را به زبان فارسی وارد کنید",
  });

export const PersonalInfoFamilySchame = z
  .string()
  .min(2, { message: "لطفا نام خانوادگی خود را به زبان فارسی وارد کنید" })
  .regex(/^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/, {
    message: "لطفا نام خانوادگی خود را به زبان فارسی وارد کنید",
  });

export const PersonalInfoSchame = z.object({
  name: PersonalInfoNameSchame,
  family: PersonalInfoFamilySchame,
  code_meli: PersonalInfoCode_meliSchame,
});

export const AddressState_idSchame = z
  .string()
  .min(24, { message: "لطفا استان خود را انتخاب کنید" });
export const AddressCity_idSchame = z
  .string()
  .min(24, { message: "لطفا ابتدا استان و سپس شهر خود را انتخاب کنید." });
export const AddressZip_codeSchame = z
  .string()
  .min(10, { message: "لطفا کد پستی را وارد کنید" })
  .regex(/^\d{10}$|[۰۱۲۳۴۵۶۷۸۹]{10}$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
    message: "لطفا کد پستی را با اعداد انگلیسی وارد کنید",
  });
export const AddressHouse_numberSchame = z
  .string()
  .min(1, { message: "لطفا پلاک را وارد کنید" })
  .regex(/^\d*$|[۰۱۲۳۴۵۶۷۸۹]*$|[٠١٢٣٤٥٦٧٨٩]{10}$/, {
    message: "لطفا پلاک را با اعداد انگلیسی وارد کنید",
  });
export const AddressSchame = z
  .string()
  .min(6, { message: "آدرس وارد شده صحیح نیست" })
  .regex(
    /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی ۰۱۲۳۴۵۶۷۸۹ 1234567890 ٠١٢٣٤٥٦٧٨٩]+$/,
    {
      message: "لطفا ادرس خود را به زبان فارسی وارد کنید",
    },
  );

export const FullAddressSchame = z.object({
  state_id: AddressState_idSchame,
  city_id: AddressCity_idSchame,
  zip_code: AddressZip_codeSchame,
  house_number: AddressHouse_numberSchame,
  address: AddressSchame,
});

export const EmailScheme = z
  .string()
  .toLowerCase()
  .min(7, { message: "لطفا ایمیل خود را به صورت کامل وارد کنید" })
  .regex(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: "لطفا ایمیل خود را به شکل صحیح  (abc@gmail.com) وارد کنید",
    },
  );

export const emailFormSchame = z.object({
  email: EmailScheme,
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

export const otpFormSchame = z.object({
  otpNumber: OtpNumberScheme,
});

export const loginPasswordSchame = z.object({
  password: z
    .string()
    .min(1, { message: "لطفا رمز عبور را وارد کنید" })
    .max(32, { message: "رمز عبور وارد شده صحیح نیست" }),
});

export const comparePasswordWithOtpScham = z
  .object({
    password: PasswordScham,
    confirmPassword: z.string(),
    otpNumber: OtpNumberScheme,
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "رمز عبور ها مشابه نیستند",
      path: ["confirmPassword"],
    },
  );

export const comparePasswordWithCurrentPasswordScham = z
  .object({
    currentPassword: z.string(),
    password: PasswordScham,
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "رمز عبور ها مشابه نیستند",
      path: ["confirmPassword"],
    },
  );

export const LoginWithPhoneForm = z.object({
  phone: PhoneSchame,
});

export const ChangePhoneFormScheme = z.object({
  newPhone: PhoneSchame,
  otpNumber: OtpNumberScheme,
});

export const OrderAddressStateScheme = z.object({
  id: z.string(),
  state_name: z.string(),
});

export const OrderAddressCityScheme = z.object({
  city_name: z.string(),
  id: z.string(),
  state_id: z.string(),
});

export const OrderAddressScheme = z.object({
  address: z.string(),
  city: OrderAddressCityScheme,
  city_id: z.string(),
  house_number: z.string(),
  id: z.string(),
  state: OrderAddressStateScheme,
  state_id: z.string(),
  user_id: z.string(),
  zip_code: z.string(),
});

export const OrderCartItemsProductStatisticsScheme = z.object({
  buyerRate: z.number(),
  soled: z.number(),
  totalLike: z.number(),
  totalRate: z.number(),
  views: z.number(),
});

export const OrderCartItemsProductScheme = z.object({
  brand_id: z.string(),
  createdAt: z.date(),
  id: z.string(),
  image_url: z.string(),
  main_cat_id: z.string(),
  off_percent: z.number(),
  price: z.number(),
  selling_type: z.string(),
  specific_cat_id: z.string(),
  statistics: OrderCartItemsProductStatisticsScheme,
  status: z.boolean(),
  title: z.string(),
  updatedAt: z.date(),
});

export const OrderCartItemsScheme = z.object({
  cartId: z.string(),
  id: z.string(),
  product: OrderCartItemsProductScheme,
  productId: z.string(),
  quantity: z.number(),
});

export const OrderCartScheme = z.object({
  createdAt: z.date(),
  id: z.string(),
  items: OrderCartItemsScheme.array(),
  size: z.number(),
  subDiscount: z.number(),
  subTotalWithDiscount: z.number(),
  subtotal: z.number(),
  updatedAt: z.date(),
  userId: z.string(),
});

export const OrderSelectedDateScheme = z.object({
  day: z.number(),
  dayOfyear: z.number(),
  gregorianDate: z.string(),
  holiday: z.boolean(),
  month: z.number(),
  month_name: z.string(),
  weekday: z.string(),
  year: z.number(),
});

export const OrderUserScheme = z.object({
  code_meli: PersonalInfoCode_meliSchame,
  email: EmailScheme,
  name: PersonalInfoNameSchame,
  family: PersonalInfoFamilySchame,
  phone: PhoneSchame,
  id: z.string(),
  image: z.string(),
});

export const OrderScheme = z.object({
  user_id: z.string(),
  posting_price: z.number(),
  payment_status: z.boolean(),
  final_price: z.number(),
  payment_method: z.nativeEnum(PayMethod),
  status: z.nativeEnum(OrderStatus),
  address: OrderAddressScheme,
  cart: OrderCartScheme,
  selectedDate: OrderSelectedDateScheme,
  user: OrderUserScheme,
});
