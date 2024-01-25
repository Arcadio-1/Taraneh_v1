"use server";
import {
  ChangePhoneFormScheme,
  phoneSchame,
} from "../../../types_validation/validation";
import { z } from "zod";
import { prisma } from "../../../lib/db/prisma";
import { getUserPhone } from "../../getUserPhone";
import { signOut } from "next-auth/react";
import { IResponse, OtpType } from "@/types_validation/type";
import { getOtp } from "../../OTP/redisActions/getOtp";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { expireOtp } from "../../OTP/redisActions/removeOtp";
import { env } from "@/types_validation/env";
import { Redis } from "ioredis";

interface IResponseSetNewPhone extends IResponse {
  newPhone: z.infer<typeof phoneSchame> | null;
}

const setNewPhone: ({
  otpNumber,
  newPhone,
}: z.infer<
  typeof ChangePhoneFormScheme
>) => Promise<IResponseSetNewPhone> = async ({ otpNumber, newPhone }) => {
  try {
    const inputValue = {
      otpNumber: convert_to_en_number(otpNumber),
      newPhone: convert_to_en_number(newPhone),
    };
    const safeDataWithZod = ChangePhoneFormScheme.safeParse({
      newPhone: inputValue.newPhone,
      otpNumber: inputValue.otpNumber,
    });
    if (!safeDataWithZod.success) {
      throw new Error(safeDataWithZod.error.message);
    }

    const getPhone = await getUserPhone();

    if (!getPhone.ok || !getPhone.phone) {
      signOut({ callbackUrl: "/profile/personal-info" });
      throw new Error(getPhone.message);
    }

    if (inputValue.newPhone === getPhone.phone) {
      throw new Error("لطفا شماره جدید وارد کنید");
    }

    const existenCheck = await prisma.user.findUnique({
      where: { phone: inputValue.newPhone },
    });
    if (existenCheck) {
      throw new Error("این شماره قبلا ثبت شده");
    }

    const orgOtp = await getOtp(getPhone.phone);
    if (!orgOtp.ok) {
      throw new Error(orgOtp.message);
    }
    if (inputValue.otpNumber !== orgOtp.number) {
      throw new Error("رمز یکبار مصرف صحیح نیست");
    }
    await expireOtp(getPhone.phone);

    const jsonValue = JSON.stringify({ phone: inputValue.newPhone });
    const redis = new Redis(env.REDIS_KEY, {
      connectTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
      },
    });
    const setNewPhoneOnRedis = await redis.set(
      `${getPhone.phone}${OtpType.changePhone}`,
      jsonValue,
      "EX",
      600,
    );
    await redis.quit();

    if (!setNewPhoneOnRedis) {
      throw new Error("خطا در ثبت شماره جدید در حافظه");
    }
    return {
      status: "Success",
      ok: true,
      message: "احراز هویت با موفقیت انجام شد",
      newPhone: inputValue.newPhone,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "Error",
        ok: false,
        message: error.message,
        newPhone: null,
      };
    }
    return {
      status: "Error",
      ok: false,
      message: "بروز خطا در احراز هویت",
      newPhone: null,
    };
  }
};
export default setNewPhone;
