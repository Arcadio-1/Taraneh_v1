"use server";

import { z } from "zod";
import { IResponse, OtpType, RedisOtpValue } from "@/types_validation/type";
import { OtpNumberScheme, phoneSchame } from "@/types_validation/validation";
import { env } from "@/types_validation/env";
import { Redis } from "ioredis";
type IResponseWithNumber = IResponse & {
  number: z.infer<typeof OtpNumberScheme> | null;
  type: OtpType | null;
};

export const getOtp: (
  phone: z.infer<typeof phoneSchame>,
) => Promise<IResponseWithNumber> = async (phone) => {
  try {
    const isKeyValid = phoneSchame.safeParse(phone);

    if (!isKeyValid.success) {
      throw new Error(isKeyValid.error.message);
    }
    const redis = new Redis(env.REDIS_KEY, {
      connectTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });
    const getRedis = await redis.get(phone);
    await redis.quit();

    if (!getRedis) {
      throw new Error("اقدام به ارسال رمز یکبار مصرف کنید");
    }

    const values: RedisOtpValue = JSON.parse(getRedis);

    return {
      status: "Success",
      ok: true,
      number: values.number,
      type: values.type,
      message: "دریافت رمز یکبار مصرف به دیتابیس با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        date: null,
        number: null,
        type: null,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      date: null,
      number: null,
      type: null,
      message: "خطا در دریافت رمز یکبار مصرف در دیتابیس",
    };
  }
};
