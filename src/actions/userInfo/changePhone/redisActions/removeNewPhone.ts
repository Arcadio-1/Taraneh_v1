"use server";

import { z } from "zod";
import { IResponse } from "@/types_validation/type";
import { PhoneSchame } from "@/types_validation/validation";
import { redis } from "@/lib/redis/redis";

export const expireOtp: (
  phone: z.infer<typeof PhoneSchame>,
) => Promise<IResponse> = async (phone) => {
  try {
    const isKeyValid = PhoneSchame.safeParse(phone);

    if (!isKeyValid.success) {
      throw new Error(isKeyValid.error.message);
    }
    const removeRedis = await redis.expire(phone, -2);
    if (!removeRedis) {
      throw new Error("کلید مورد نظر یافت نشد");
    }
    return {
      status: "Success",
      ok: true,
      message: "کد یکبار مصرف با موفقیت منقضی شد",
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
      message: "خطا در منقضی کردن رمز یکبار مصرف کد X",
    };
  }
};
