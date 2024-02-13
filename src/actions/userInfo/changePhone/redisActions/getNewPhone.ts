"use server";

import { env } from "@/types_validation/env";
import { Redis } from "ioredis";
import { z } from "zod";
import { IResponse, OtpType } from "@/types_validation/type";
import { PhoneSchame } from "@/types_validation/validation";
import { signOut } from "next-auth/react";
import { getUserPhone } from "@/actions/util/getUserPhone";

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
    const redis = new Redis(env.REDIS_KEY, {
      connectTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const getRedis = await redis.get(`${getPhone.phone}${OtpType.changePhone}`);
    await redis.quit();
    if (!getRedis) {
      throw new Error("زمان مجاز به پایان رسیده مجددا اقدام نمایید");
    }
    const values: { phone: z.infer<typeof PhoneSchame> } = JSON.parse(getRedis);
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
