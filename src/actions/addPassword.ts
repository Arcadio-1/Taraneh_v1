"use server";
import { comparePasswordWithOtpScham } from "../types_validation/validation";
import { z } from "zod";
import { prisma } from "../lib/db/prisma";
import { getHashedPassword } from "../lib/bcrypt/bcrypt";
import { getUserId } from "./getUserId";
import { signOut } from "next-auth/react";
import { IResponse } from "@/types_validation/type";

const addPassword: (
  passwordAddingData: z.infer<typeof comparePasswordWithOtpScham>,
) => Promise<IResponse> = async (passwordAddingData) => {
  try {
    const safeDataWithZod =
      comparePasswordWithOtpScham.safeParse(passwordAddingData);
    if (!safeDataWithZod.success) {
      throw new Error("اطلاعات وارد شده صحیح نیست");
    }

    const user_id = await getUserId();
    if (!user_id) {
      signOut({ callbackUrl: "/profile/personal-info" });
      throw new Error("لطفا مجددا به حساب کاربری خود وارد شوید");
    }
    // const hassPassword = await prisma.user.findUnique({
    //   where: { id: user_id },
    //   select: { password: true },
    // });
    // if (hassPassword) {
    //   throw new Error("از بخش ویرایش کلمه عبور اقدام نمایید");
    // }
    const { password, otpNumber } = safeDataWithZod.data;

    if (otpNumber !== "12345") {
      throw new Error("رمز یکبار مصرف صحیح نیست");
    }
    const hashedPass = await getHashedPassword(password);

    const request = await prisma.user.update({
      where: { id: user_id },
      data: {
        password: hashedPass,
      },
    });
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
