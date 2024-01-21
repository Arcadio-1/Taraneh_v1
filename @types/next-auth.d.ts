import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
      family: string;
      id: string;
      email: string;
      code_meli: string;
      password: boolean;
      role: Role;
      image: string;
      name: string;
    } & DefaultSession["user"];
  }
}
