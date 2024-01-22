"use server";

import { z } from "zod";
import { phoneSchame } from "../types_validation/validation";
import { checkUser } from "./checkUser";
import { Sign } from "@/types_validation/type";
import { prisma } from "../lib/db/prisma";

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
