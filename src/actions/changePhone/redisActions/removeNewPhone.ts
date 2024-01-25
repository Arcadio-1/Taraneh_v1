"use server";

import { z } from "zod";
import { IResponse } from "@/types_validation/type";
import { phoneSchame } from "@/types_validation/validation";
import { env } from "@/types_validation/env";
import { Redis } from "ioredis";

export const expireOtp: (
  phone: z.infer<typeof phoneSchame>,
) => Promise<IResponse> = async (phone) => {
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
    const removeRedis = await redis.expire(phone, -2);
    await redis.quit();
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
