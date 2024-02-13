"use server";
import { z } from "zod";
import { comparePasswordWithCurrentPasswordScham } from "../../../types_validation/validation";
import { getUserPhone } from "../../util/getUserPhone";
import { prisma } from "../../../lib/db/prisma";
import { getHashedPassword, varifiyPassword } from "../../../lib/bcrypt/bcrypt";
import { IResponse } from "@/types_validation/type";
import { signOut } from "next-auth/react";

const changePasswordWithCurrentPassword: (
  passwordChangingData: z.infer<typeof comparePasswordWithCurrentPasswordScham>,
) => Promise<IResponse> = async (passwordChangingData) => {
  try {
    const checkInputs =
      comparePasswordWithCurrentPasswordScham.safeParse(passwordChangingData);
    if (!checkInputs.success) {
      throw new Error("اطلاعات وارد شده صحیح نمیباشد");
    }
    const getPhone = await getUserPhone();
    if (!getPhone.ok || !getPhone.phone) {
      signOut({ callbackUrl: "/profile/user-info" });
      throw new Error(getPhone.message);
    }
    const user = await prisma.user.findUnique({
      where: { phone: getPhone.phone },
    });
    if (!user) {
      throw new Error("خطا در یافتن حساب کاربری");
    }
    const isValid = await varifiyPassword(
      passwordChangingData.currentPassword,
      user.password,
    );
    if (!isValid) {
      throw new Error("رمز فعلی وارد شده صحیح نیست");
    }
    const hasedPassword = await getHashedPassword(
      passwordChangingData.password,
    );
    const requestChangePassword = await prisma.user.update({
      where: { phone: getPhone.phone },
      data: { password: hasedPassword },
    });
    if (!requestChangePassword) {
      throw new Error("خطا در ثبت کلمه عبور");
    }
    return {
      status: "Success",
      ok: true,
      message: "ویرایش کلمه عبور با موفقیت انجام شد",
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
      message: "خطا در ویرایش کلمه عبور",
    };
  }
};

export default changePasswordWithCurrentPassword;
