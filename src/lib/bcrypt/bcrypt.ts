"use server";
import { hash, compare } from "bcrypt";
export const getHashedPassword = async (password: string) => {
  const hashedPass = await hash(password, 12);
  return hashedPass;
};

export const varifiyPassword = async (password: string, hashedPass: string) => {
  const isValid = await compare(password, hashedPass);
  return isValid;
};
