"use server";

import axios from "axios";
import { z } from "zod";
import { phoneSchame } from "@/types_validation/validation";
import { IResponse, OtpType } from "@/types_validation/type";
import { getOtp } from "./redisActions/getOtp";
import setOtp from "./redisActions/setOtp";
import { env } from "@/types_validation/env";

interface SendOtpProps {
  phone: z.infer<typeof phoneSchame>;
  type: OtpType;
}

const sendOtpValidator = z.object({
  phone: phoneSchame,
  type: z.nativeEnum(OtpType),
});

const sendOtp: ({ phone, type }: SendOtpProps) => Promise<IResponse> = async ({
  phone,
  type,
}) => {
  try {
    const isInputValid = sendOtpValidator.safeParse({ phone, type });
    if (!isInputValid.success) {
      throw new Error("ورودی نا معتبر");
    }
    const existingCheck = await getOtp(phone);
    if (existingCheck.ok) {
      throw new Error("لطفا تا پایان 3 دقیقه صبر کنید");
    }

    const requestToMeliPayamak = await axios({
      method: "post",
      url: `https://console.melipayamak.com/api/send/otp/${env.MELI_KEY}`,
      data: {
        to: phone,
      },
    });
    if (!requestToMeliPayamak) {
      throw new Error("خطا در برقراری ارتباط");
    }
    if (requestToMeliPayamak.status !== 200) {
      throw new Error("خطا در ارسال کد یک بار مصرف");
    }

    const seter = await setOtp({
      phone: phone,
      number: requestToMeliPayamak.data.code,
      type: type,
    });

    if (!seter.ok) {
      throw new Error(seter.message);
    }
    return {
      status: "Success",
      ok: true,
      message: "رمز یک بار مصرف با موفقیت ارسال شد",
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
      message: "خطا در ارسال کد یک بار مصرف کد X",
    };
  }
};

export default sendOtp;
