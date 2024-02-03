"use server";

import { z } from "zod";
import { OtpNumberScheme, phoneSchame } from "../types_validation/validation";
import { checkUser } from "./checkUser";
import { IResponse, Sign } from "@/types_validation/type";
import { prisma } from "../lib/db/prisma";
import { getOtp } from "./OTP/redisActions/getOtp";

const signupValidatorScheme = z.object({
  phone: phoneSchame,
  otpNumber: OtpNumberScheme,
});

export const userSignup: (
  phone: z.infer<typeof phoneSchame>,
  otpNumber: z.infer<typeof OtpNumberScheme>,
) => Promise<IResponse> = async (phone, otpNumber) => {
  try {
    const isValid = signupValidatorScheme.safeParse({ phone, otpNumber });
    if (!isValid.success) {
      throw new Error(isValid.error.message);
    }
    const orgOtp = await getOtp(phone);

    if (!orgOtp.ok) {
      throw new Error(orgOtp.message);
    }

    if (otpNumber !== orgOtp.number) {
      throw new Error("رمز یک بار مصرف اشتباه میباشد");
    }

    const check = await checkUser(phone);

    if (check.type !== Sign.signUp) {
      throw new Error("با این شماره قبلا ثبت نام شده");
    }
    const signup = await prisma.user.create({
      data: { phone: check.phone, email: "" },
    });
    if (!signup) {
      throw new Error("خطا در ثبت نام");
    }
    return {
      status: "Success",
      ok: true,
      message: "ثبت نام با موفقیت انجام شد",
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
      message: "خطا در ثبت نام کد X",
    };
  }
};
