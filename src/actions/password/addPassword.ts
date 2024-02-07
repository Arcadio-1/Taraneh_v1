"use server";
import { comparePasswordWithOtpScham } from "../../types_validation/validation";
import { z } from "zod";
import { prisma } from "../../lib/db/prisma";
import { getHashedPassword } from "../../lib/bcrypt/bcrypt";
import { getUserPhone } from "../util/getUserPhone";
import { signOut } from "next-auth/react";
import { IResponse } from "@/types_validation/type";
import { getOtp } from "../OTP/redisActions/getOtp";
import { expireOtp } from "../OTP/redisActions/removeOtp";

const addPassword: (
  passwordAddingData: z.infer<typeof comparePasswordWithOtpScham>,
) => Promise<IResponse> = async (passwordAddingData) => {
  try {
    const safeDataWithZod =
      comparePasswordWithOtpScham.safeParse(passwordAddingData);
    if (!safeDataWithZod.success) {
      throw new Error("اطلاعات وارد شده صحیح نیست");
    }

    const getPhone = await getUserPhone();

    if (!getPhone.ok || !getPhone.phone) {
      signOut({ callbackUrl: "/profile/personal-info" });
      throw new Error(getPhone.message);
    }

    const { password, otpNumber } = safeDataWithZod.data;

    const orgOtp = await getOtp(getPhone.phone);
    if (!orgOtp.ok) {
      throw new Error(orgOtp.message);
    }
    if (otpNumber !== orgOtp.number) {
      throw new Error("رمز یکبار مصرف صحیح نیست");
    }
    const hashedPass = await getHashedPassword(password);

    const request = await prisma.user.update({
      where: { phone: getPhone.phone },
      data: {
        password: hashedPass,
      },
    });
    const expire = await expireOtp(getPhone.phone);
    if (!request) {
      throw new Error("خطا در ثبت کلمه عبور");
    }
    return {
      status: "Success",
      ok: true,
      message: "کلمه عبور با موفقیت ثبت شد",
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
      message: "بروز خطا در ثبت کلمه عبور",
    };
  }
};

export default addPassword;
