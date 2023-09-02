import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";
import { phoneSchame } from "@/lib/util/validation";

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
          // console.log("result", phone);
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
    async jwt({ token, user, session }) {
      console.log("jwt callback", token, user, session);
      if (user) {
        return {
          ...token,
          id: user.id,
          phone: user.phone,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback", session, token, user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phone: token.phone,
        },
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
