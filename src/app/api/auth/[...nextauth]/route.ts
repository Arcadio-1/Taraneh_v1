import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";
import { personalInfoFormSchame, phoneSchame } from "@/lib/util/validation";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  // debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "09..." },
      },
      async authorize(credentials) {
        try {
          const phone = phoneSchame.parse(credentials);
        } catch (error) {
          console.log(error);
          throw new Error("شماره موبایل وارد شده صحیح نیست");
        }
        if (!credentials || !credentials.phone) {
          throw new Error("لطفا شماره موبایل خود را وارد کنید");
        }
        const user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
          include: { sessions: true },
        });
        if (user) {
          return user;
        } else {
          return null;
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
        if (session.feild === "personal_info") {
          const data = personalInfoFormSchame.parse(session.data);
          const customSession: {
            id: string;
            data: z.infer<typeof personalInfoFormSchame>;
          } = session;
          // customSession
          // console.log("customSession", customSession);
          token.name = customSession.data.name;
          token.family = customSession.data.family;
          token.code_meli = customSession.data.code_meli;
          await prisma.user.update({
            where: { id: customSession.id },
            data: {
              name: customSession.data.name,
              family: customSession.data.family,
              code_meli: customSession.data.code_meli,
            },
          });
        }
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          family: user.family,
          phone: user.phone,
          email: user.email,
          address: user.address,
          state: user.state,
          city: user.city,
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
        // user: {
        ...session.user,
        id: token.id,
        name: token.name,
        family: token.family,
        phone: token.phone,
        email: token.email,
        address: token.address,
        state: token.state,
        city: token.city,
        code_meli: token.code_meli,
        role: token.role,
        image: token.image,
        // },
      };
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
