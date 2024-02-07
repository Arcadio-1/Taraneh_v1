"use server";

import { City, UserAddress } from "@prisma/client";
import { prisma } from "../../lib/db/prisma";
import { AddressSchame } from "../../types_validation/validation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { convert_to_en_number } from "../../util_functions/translateNumbers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth/authOptions";

export async function getAddress(userId: string): Promise<UserAddress | null> {
  const address = await prisma.userAddress.findFirst({
    where: { user_id: userId },
  });
  return address ? address : null;
}
interface Status {
  status: string;
  titile: string;
  message: any;
}
export async function setAddress(
  address_data: z.infer<typeof AddressSchame>,
): Promise<Status> {
  try {
    const isAddressValid = AddressSchame.safeParse(address_data);
    if (!isAddressValid.success) {
      throw new Error("آدرس وارد شده صحیح نیست");
    }
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("لطفا مجددا به حساب کاربری خود وارد شوید");
    }
    const { id: user_id } = session.user;
    const prismaAddresData: z.infer<typeof AddressSchame> = {
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
    return {
      status: "success",
      titile: "ثبت شد.",
      message: "آدرس شما با موفقیت ثبت شد",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        titile: "بروز خطا",
        message: error.message,
      };
    }
    return {
      status: "error",
      titile: "بروز خطا",
      message: "خطا در ثبت اطلاعات آدرس",
    };
  }
}

export const getCities = async function (state_id: string): Promise<City[]> {
  const cities = await prisma.city.findMany({ where: { state_id: state_id } });

  return cities;
};
