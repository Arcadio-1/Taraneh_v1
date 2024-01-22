"use server";

import axios from "axios";
import { env } from "../types_validation/env";

interface IOtpResponse {
  status: "success" | "error";
  code: string;
  message: string;
}

const sendOtp: (phone: string) => Promise<IOtpResponse> = async (
  phone: string,
) => {
  const request = await axios({
    method: "post",
    url: `https://console.melipayamak.com/api/send/otp/${env.MELI_KEY}`,
    data: {
      to: phone,
    },
  });
  if (!request) {
    return {
      status: "error",
      code: "",
      message: "خطا در برقراری ارتباط",
    };
  }
  if (request.status !== 200) {
    return {
      status: "error",
      code: "",
      message: "خطا در ارسال رمز یک بار مصرف",
    };
  }
  return {
    status: "success",
    code: request.data.code as string,
    message: request.data.status as string,
  };
};

export default sendOtp;
