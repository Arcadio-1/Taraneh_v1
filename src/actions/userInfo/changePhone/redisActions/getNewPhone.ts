"use server";

import { z } from "zod";
import { IResponse, OtpType } from "@/types_validation/type";
import { PhoneSchame } from "@/types_validation/validation";
import { signOut } from "next-auth/react";
import { getUserPhone } from "@/actions/util/getUserPhone";
import { redis } from "@/lib/redis/redis";

type IResponseWithNumber = IResponse & {
  phone: z.infer<typeof PhoneSchame> | null;
};

export const getNewPhone: () => Promise<IResponseWithNumber> = async () => {
  try {
    const getPhone = await getUserPhone();

    if (!getPhone.ok || !getPhone.phone) {
      signOut({ callbackUrl: "/profile/user-info" });
      throw new Error(getPhone.message);
    }

    const getRedis: { phone: z.infer<typeof PhoneSchame> } | null =
      await redis.get(`${getPhone.phone}${OtpType.changePhone}`);
    if (!getRedis) {
      throw new Error("زمان مجاز به پایان رسیده مجددا اقدام نمایید");
    }
    const values: { phone: z.infer<typeof PhoneSchame> } = getRedis;
    return {
      status: "Success",
      ok: true,
      phone: values.phone,
      message: "دریافت رمز یکبار مصرف به دیتابیس با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        phone: null,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      phone: null,
      message: "خطا در دریافت رمز یکبار مصرف در دیتابیس",
    };
  }
};
