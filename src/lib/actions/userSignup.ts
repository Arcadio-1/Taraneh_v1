"use server";

import { z } from "zod";
import { phoneSchame } from "../util/validation";
import { checkUser } from "./checkUser";
import { Sign } from "@/types/type";
import { prisma } from "../db/prisma";

export const userSignup: (
  phone: z.infer<typeof phoneSchame>,
  otp: string,
) => Promise<{ success: boolean }> = async (phone, otp) => {
  if (otp !== "12345") {
    return { success: false };
  }

  const check = await checkUser(phone);
  if (check.type === Sign.signUp) {
    const signup = await prisma.user.create({
      data: { phone: check.phone, email: "" },
    });
    return signup ? { success: true } : { success: false };
  } else {
    return { success: false };
  }
};
