"use server";

import { prisma } from "../../../lib/db/prisma";
import { FullAddressSchame } from "../../../types_validation/validation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { convert_to_en_number } from "../../../util_functions/translateNumbers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth/authOptions";
import { IResponse } from "@/types_validation/type";

export async function addAddress(
  address_data: z.infer<typeof FullAddressSchame>,
): Promise<IResponse> {
  try {
    const isAddressValid = FullAddressSchame.safeParse(address_data);
    if (!isAddressValid.success) {
      throw new Error("آدرس وارد شده صحیح نیست");
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا مجددا به حساب کاربری خود وارد شوید");
    }
    const { id: user_id } = session.user;
    const prismaAddresData: z.infer<typeof FullAddressSchame> = {
      address: address_data.address,
      city_id: address_data.city_id,
      state_id: address_data.state_id,
      house_number: convert_to_en_number(address_data.house_number),
      zip_code: convert_to_en_number(address_data.zip_code),
    };
    const addOrUpdateAddress = await prisma.userAddress.upsert({
      where: { user_id: user_id },
      create: { ...prismaAddresData, user_id: user_id },
      update: prismaAddresData,
    });
    if (!addOrUpdateAddress) {
      throw new Error("خطا در ثبت آدرس");
    }
    revalidatePath(`/profile/addresses`);
    revalidatePath(`/profile/user-info`);
    return {
      status: "Success",
      ok: true,
      message: "آدرس شما با موفقیت ثبت شد",
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
      message: "خطا در ثبت اطلاعات آدرس",
    };
  }
}
