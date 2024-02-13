"use server";
import { prisma } from "@/lib/db/prisma";
import { City } from "@prisma/client";
type TGetCities =
  | {
      status: "Success";
      ok: true;
      message: string;
      cities: City[];
    }
  | {
      status: "Error";
      ok: false;
      message: string;
      cities: [];
    };

export const getCities = async (stateId: string): Promise<TGetCities> => {
  try {
    const request = await prisma.city.findMany({
      where: { state_id: stateId },
    });
    if (!request || request.length < 1) {
      throw new Error("خطا در دریاف لیست شهر ها");
    }
    return {
      cities: request,
      message: "لیست شهر ها با موفقیت دریافت شد",
      ok: true,
      status: "Success",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        cities: [],
        message: error.message,
        ok: false,
        status: "Error",
      };
    }
    return {
      cities: [],
      message: "خطا در دریافت لیست شهر ها",
      ok: false,
      status: "Error",
    };
  }
};
