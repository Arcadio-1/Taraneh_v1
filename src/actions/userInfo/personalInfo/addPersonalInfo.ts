"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { IResponse } from "@/types_validation/type";
import { PersonalInfoSchame } from "@/types_validation/validation";
import { convert_to_en_number } from "@/util_functions/translateNumbers";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addPersonalInfo = async (
  userInfo: z.infer<typeof PersonalInfoSchame>,
): Promise<IResponse> => {
  try {
    const userInfoFormated: z.infer<typeof PersonalInfoSchame> = {
      ...userInfo,
      code_meli: convert_to_en_number(userInfo.code_meli),
    };
    const isValid = PersonalInfoSchame.safeParse(userInfoFormated);
    if (!isValid.success) {
      throw new Error(isValid.error.message);
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا به حساب کاربری خود وارد شوید");
    }
    const { code_meli, family, name } = userInfoFormated;
    const isCodeMeliNotUnique = await prisma.user.count({
      where: { code_meli: code_meli },
    });
    if (isCodeMeliNotUnique && session.user.code_meli !== code_meli) {
      throw new Error("شماره ملی وارد شده قبلا ثبت شده");
    }
    const request = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        family: family,
        code_meli: code_meli,
      },
    });
    if (!request) {
      throw new Error("خطا در ثبت مشخصات");
    }
    revalidatePath(`/profile/user-info`);
    return {
      message: "مشخصات با موفقیت ثبت شد",
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
      message: "بروز خطا در ثبت مشخصات",
      ok: false,
      status: "Error",
    };
  }
};
