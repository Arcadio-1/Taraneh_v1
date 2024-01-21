import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";
import {
  emailSchame,
  passwordScham,
  personalInfoFormSchame,
  phoneSchame,
} from "@/lib/util/validation";
import { mergeCarts } from "@/lib/actions/mergeCart";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { varifiyPassword } from "../bcrypt/bcrypt";
import { getCart } from "../actions/getCart";

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
          const phone = phoneSchame.safeParse(credentials);
          if (
            !phone.success ||
            !credentials ||
            !credentials.phone ||
            !credentials.method
          ) {
            throw new Error("مشخصات وارد شده صحیح نیست");
          }
          if (
            credentials.method !== "otp" &&
            credentials.method !== "password"
          ) {
            throw new Error("از روش استاندارد برای ورود اقدام نمایید!");
          }
          if (credentials.method === "otp" && credentials.otpNum !== "12345") {
            throw new Error("رمز وارد شده صحیح نمیباشد");
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
            const enteredPasswordIsSafe = passwordScham.safeParse(
              credentials.password,
            );
            if (!enteredPasswordIsSafe.success) {
              throw new Error("کلمه عبور وارد شده صحیح نیست");
            }
            if (!user.password) {
              throw new Error("1 از طریق رمز یکبار مصرف وارد شوید");
            }
            if (user.password.length < 50) {
              throw new Error("3 از طریق رمز یکبار مصرف وارد شوید");
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
          return user;
        } catch (error) {
          if (error instanceof Error) throw new Error(error.message);
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
        if (!currentSession || !currentSession?.user.id) {
          throw new Error("your not logged in");
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
          try {
            const data = personalInfoFormSchame.safeParse(session.data);
            if (!data.success) {
              throw new Error("personal_info is not correct");
            }
            const customSession: {
              data: z.infer<typeof personalInfoFormSchame>;
            } = session;
            // customSession
            token.name = customSession.data.name;
            token.family = customSession.data.family;
            token.code_meli = customSession.data.code_meli;
            await prisma.user.update({
              where: { id: userId },
              data: {
                name: customSession.data.name,
                family: customSession.data.family,
                code_meli: customSession.data.code_meli,
              },
            });
          } catch (error) {
            console.log(error || "somthing went wrong");
          }
        }
        if (session.feild === "phone") {
          try {
            const data = phoneSchame.safeParse(session.data);
            if (!data.success) {
              throw new Error("phone number is not correct code:1");
            }
            const existenCheck = await prisma.user.findUnique({
              where: { phone: session.data.phone },
            });
            const customSession: {
              data: z.infer<typeof phoneSchame>;
            } = session;
            if (!existenCheck) {
              token.phone = customSession.data.phone;
              await prisma.user.update({
                where: { id: userId },
                data: {
                  phone: customSession.data.phone,
                },
              });
            }
          } catch (error) {
            console.log(error || "phone number is not correct code:2");
          }
        }
        if (session.feild === "addPasswordAndChangeWithOth") {
          try {
            const safeDataWithZod = passwordScham.safeParse(
              session.data.password,
            );
            if (!safeDataWithZod.success) {
              throw new Error("missing data + add Password + code:1");
            }

            const { data: password } = safeDataWithZod;
            const isValid = await varifiyPassword(
              password,
              currentUser.password,
            );

            if (!isValid) {
              throw new Error("somthing went wrong");
            }
            token.password = true;
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
            console.log("what the f*ck is going on");
          }
        }
        if (session.feild === "email") {
          try {
            const data = emailSchame.safeParse(session.data);
            if (!data.success) {
              throw new Error("email is not crrect code:1");
            }
            const existenCheck = await prisma.user.findUnique({
              where: { email: session.data.email },
            });
            const customSession: {
              data: z.infer<typeof emailSchame>;
            } = session;
            if (!existenCheck) {
              token.email = customSession.data.email;
              await prisma.user.update({
                where: { id: userId },
                data: {
                  email: customSession.data.email,
                },
              });
            }
          } catch (error) {
            console.log(error || "email is not corrext code:2");
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
      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser, profile }) {
      await getCart();
      await mergeCarts(user.id);
    },
  },
  secret: env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};
