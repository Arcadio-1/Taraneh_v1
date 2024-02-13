import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/types_validation/env";
import { PrismaClient } from "@prisma/client";
import {
  emailFormSchame,
  PasswordScham,
  PersonalInfoSchame,
  PhoneSchame,
} from "@/types_validation/validation";
import { mergeCartsItems } from "@/actions/ordering/cart_item/mergeCartsItems";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { varifiyPassword } from "../bcrypt/bcrypt";
import { getOtp } from "@/actions/OTP/redisActions/getOtp";
import { expireOtp } from "@/actions/OTP/redisActions/removeOtp";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  // debug: true,
  pages: {
    signIn: "/users/login",
    // error: "/users/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "09..." },
        otpNum: { label: "otpNum", type: "number", placeholder: "" },
        password: { label: "password", type: "text", placeholder: "" },
        method: { value: "otp | password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("مشخصات ورود را وارد کنید");
          }
          const phone = PhoneSchame.safeParse(credentials.phone);
          if (!phone.success) {
            throw new Error("مشخصات وارد شده صحیح نیست");
          }
          if (
            credentials.method !== "otp" &&
            credentials.method !== "password"
          ) {
            throw new Error("از روش استاندارد برای ورود اقدام نمایید!");
          }
          if (credentials.method === "otp") {
            const orgOtp = await getOtp(credentials.phone);
            if (!orgOtp.ok) {
              throw new Error(orgOtp.message);
            }
            if (credentials.otpNum !== orgOtp.number) {
              throw new Error("رمز وارد شده صحیح نمیباشد");
            }
          }
          const user = await prisma.user.findUnique({
            where: { phone: credentials.phone },
          });
          if (!user) {
            throw new Error("کاربری با این مشخصات یافت نشد");
          }
          if (credentials.method === "password") {
            if (!credentials.password) {
              throw new Error("کلمه عبور را وارد کنید");
            }
            const enteredPasswordIsSafe = PasswordScham.safeParse(
              credentials.password,
            );
            if (!enteredPasswordIsSafe.success) {
              throw new Error("کلمه عبور وارد شده صحیح نیست");
            }
            if (!user.password) {
              throw new Error(" از طریق رمز یکبار مصرف وارد شوید");
            }
            if (user.password.length < 50) {
              throw new Error(" از طریق رمز یکبار مصرف وارد شوید");
            }
            if (credentials.method === "password") {
              const isValid = await varifiyPassword(
                credentials.password,
                user.password,
              );
              if (!isValid) {
                throw new Error("کلمه عبور وارد شده صحیح نیست");
              }
            }
          }
          await expireOtp(credentials.phone);
          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("خطا در ورود");
        }
      },
    }),
    // ,
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
  ],

  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        const currentSession = await getServerSession(authOptions);
        if (!currentSession) {
          throw new Error("you should login");
        }
        const {
          user: { id: userId },
        } = currentSession;

        const currentUser = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!currentUser) {
          throw new Error("user not found");
        }
        if (session.feild === "personal_info") {
          token.name = currentUser.name;
          token.family = currentUser.family;
          token.code_meli = currentUser.code_meli;
        }
        if (session.feild === "email") {
          if (currentUser.email) {
            token.email = currentUser.email;
          }
        }
        if (session.feild === "phone") {
          try {
            token.phone = currentUser.phone;
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          }
        }
        if (session.feild === "addPasswordAndChangeWithOtp") {
          try {
            if (!currentUser.password) {
              throw new Error("somthing went wrong");
            }
            token.password = true;
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          }
        }
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          family: user.family,
          phone: user.phone,
          password: user.password ? true : false,
          // email: user.email,
          code_meli: user.code_meli,
          role: user.role,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          family: token.family,
          phone: token.phone,
          password: token.password ? true : false,
          email: token.email,
          code_meli: token.code_meli,
          role: token.role,
          image: token.image,
        },
      };
    },
  },
  events: {
    async signIn({ user, isNewUser, profile }) {
      await mergeCartsItems(user.id);
    },
  },
  secret: env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};
