"use server";
import { z } from "zod";
import { signOut } from "next-auth/react";
import { IResponse, OtpType } from "@/types_validation/type";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { env } from "@/types_validation/env";
import {
  ChangePhoneFormScheme,
  PhoneSchame,
} from "@/types_validation/validation";
import { getUserPhone } from "@/actions/util/getUserPhone";
import { prisma } from "@/lib/db/prisma";
import { getOtp } from "@/actions/OTP/redisActions/getOtp";
import { expireOtp } from "@/actions/OTP/redisActions/removeOtp";
import { redis } from "@/lib/redis/redis";

type IResponseSetNewPhone = IResponse & {
  newPhone: z.infer<typeof PhoneSchame> | null;
};

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
      signOut({ callbackUrl: "/profile/user-info" });
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
    const setNewPhoneOnRedis = await redis.set(
      `${getPhone.phone}${OtpType.changePhone}`,
      jsonValue,
      { ex: 600 },
    );

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
