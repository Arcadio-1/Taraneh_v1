"use server";
import { z } from "zod";
import { signOut } from "next-auth/react";
import { IResponse } from "@/types_validation/type";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { getNewPhone } from "./redisActions/getNewPhone";
import { otpFormSchame } from "@/types_validation/validation";
import { prisma } from "@/lib/db/prisma";
import { getOtp } from "@/actions/OTP/redisActions/getOtp";
import { getUserPhone } from "@/actions/util/getUserPhone";

const changePhone: ({
  otpNumber,
}: z.infer<typeof otpFormSchame>) => Promise<IResponse> = async ({
  otpNumber,
}) => {
  try {
    const inputValue = {
      otpNumber: convert_to_en_number(otpNumber),
    };
    const safeDataWithZod = otpFormSchame.safeParse({
      otpNumber: inputValue.otpNumber,
    });
    if (!safeDataWithZod.success) {
      throw new Error("اطلاعات وارد شده صحیح نیست");
    }

    const getPhone = await getUserPhone();

    if (!getPhone.ok || !getPhone.phone) {
      signOut({ callbackUrl: "/profile/user-info" });
      throw new Error(getPhone.message);
    }

    const newPhone = await getNewPhone();
    if (!newPhone.ok || !newPhone.phone) {
      throw new Error(newPhone.message);
    }

    if (newPhone.phone === getPhone.phone) {
      throw new Error("لطفا شماره جدید وارد کنید");
    }

    const existenCheck = await prisma.user.findUnique({
      where: { phone: newPhone.phone },
    });
    if (existenCheck) {
      throw new Error("این شماره قبلا ثبت شده");
    }

    const orgOtp = await getOtp(newPhone.phone);
    if (!orgOtp.ok) {
      throw new Error(orgOtp.message);
    }
    if (inputValue.otpNumber !== orgOtp.number) {
      throw new Error("رمز یکبار مصرف صحیح نیست");
    }
    const request = await prisma.user.update({
      where: { phone: getPhone.phone },
      data: {
        phone: newPhone.phone,
      },
    });

    if (!request) {
      throw new Error("خطا در ثبت شماره موبایل");
    }
    return {
      status: "Success",
      ok: true,
      message: "شماره موبایل با موفقیت ثبت شد",
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
      message: "بروز خطا در ثبت شماره موبایل",
    };
  }
};

export default changePhone;
