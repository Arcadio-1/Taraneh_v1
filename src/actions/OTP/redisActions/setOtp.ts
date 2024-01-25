"use server";

import { z } from "zod";
import { IResponse, OtpType } from "@/types_validation/type";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { OtpNumberScheme, phoneSchame } from "@/types_validation/validation";
import { getOtp } from "./getOtp";
import { env } from "@/types_validation/env";
import { Redis } from "ioredis";

interface CreateOtpProps {
  phone: z.infer<typeof phoneSchame>;
  number: z.infer<typeof OtpNumberScheme>;
  type: OtpType;
}

const createOtpPropsScheme = z.object({
  phone: phoneSchame,
  number: OtpNumberScheme,
  type: z.nativeEnum(OtpType),
});

const setOtp: ({
  number,
  phone,
  type,
}: CreateOtpProps) => Promise<IResponse> = async ({ phone, number, type }) => {
  try {
    const isValid = createOtpPropsScheme.safeParse({ phone, number, type });
    if (!isValid.success) {
      throw new Error(isValid.error.message);
    }

    const redisSetObjext = {
      phone: convert_to_en_number(phone),
      value: {
        number: convert_to_en_number(number),
        type: type,
      },
    };

    const existingCheck = await getOtp(phone);
    if (existingCheck.ok) {
      throw new Error("لطفا سه دقیقه صبر کنید");
    }
    const value = JSON.stringify(redisSetObjext.value);
    const redis = new Redis(env.REDIS_KEY, {
      connectTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });
    const setOtp = await redis.set(phone, value, "EX", 180);
    await redis.quit();

    if (!setOtp) {
      throw new Error("خطا در ایجاد رمز یکبار مصرف کد 1");
    }
    return {
      status: "Success",
      ok: true,
      message: "افزودن رمز یکبار مصرف به دیتابیس با موفقیت انجام شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "خطا در ایجاد رمز یکبار مصرف در دیتابیس کد 0",
    };
  }
};

export default setOtp;
