import { Role } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
      family: string;
      id: string;
      email: string;
      password: boolean;
      name: string;
      code_meli: string;
      role: Role;
      image: string;
    } & DefaultSession["user"];
  }

  interface User {
    family: string;
    phone: string;
    password: string;
    name: string;
    id: string;
    // email: string;
    code_meli: string;
    role: Role;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    family: string;
    phone: string;
    password: boolean;
    name: string;
    id: string;
    email: string;
    code_meli: string;
    role: Role;
    image: string;
  }
}
