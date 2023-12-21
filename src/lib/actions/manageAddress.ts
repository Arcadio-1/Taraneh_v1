"use server";

import { City, UserAddress } from "@prisma/client";
import { prisma } from "../db/prisma";
import { AddressSchame } from "../util/validation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { convert_to_en_number } from "../util/translateNumbers";

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
  user_id: string,
  address_data: z.infer<typeof AddressSchame>
): Promise<Status> {
  try {
    const isAddressValid = AddressSchame.safeParse(address_data);
    if (!isAddressValid.success) {
      throw new Error("ادرس وارد شده صحیح نیست");
    }
    const prismaAddresData: z.infer<typeof AddressSchame> = {
      address: address_data.address,
      city_id: address_data.city_id,
      state_id: address_data.state_id,
      house_number: convert_to_en_number(address_data.house_number),
      zip_code: convert_to_en_number(address_data.zip_code),
    };

    const checkFindAddress = await prisma.userAddress.upsert({
      where: { user_id: user_id },
      create: { ...prismaAddresData, user_id: user_id },
      update: prismaAddresData,
    });
    revalidatePath(`/profile/addresses`);
    return {
      status: "success",
      titile: "ثبت شد.",
      message: "اطلاعت آدرس با موفقیت ثبت شد",
    };
  } catch (error) {
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
