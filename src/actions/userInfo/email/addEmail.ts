"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { IResponse } from "@/types_validation/type";
import { EmailScheme } from "@/types_validation/validation";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const addEmail = async (
  email: z.infer<typeof EmailScheme>,
): Promise<IResponse> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا به حساب کاربری خود وارد شوید");
    }
    const isValid = EmailScheme.safeParse(email);
    if (!isValid.success) {
      throw new Error("ایمیل وارد شده صحیح نیست");
    }
    const isNotUnique = await prisma.user.count({ where: { email: email } });
    if (isNotUnique) {
      throw new Error("ایمیل وارد شده قبلا ثبت شده");
    }
    const request = await prisma.user.update({
      where: { id: session.user.id },
      data: { email: email },
    });
    if (!request) {
      throw new Error("خطا در ثبت ایمیل");
    }
    return {
      message: "ایمیل با موفقیت ثبت شد",
      ok: true,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        ok: false,
        status: "Error",
      };
    }
    return {
      message: "خطا در ثبت ایمیل",
      ok: false,
      status: "Error",
    };
  }
};
