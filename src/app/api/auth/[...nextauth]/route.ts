import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";
import {
  emailSchame,
  personalInfoFormSchame,
  phoneSchame,
} from "@/lib/util/validation";
import { mergeCarts } from "@/lib/actions/mergeCart";
import { z } from "zod";
import { authOptions } from "@/lib/auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
