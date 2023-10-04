import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      phone: string;
      family: string;
      id: string;
      email: string;
      code_meli: string;
      role: Role;
      image: string;
    } & DefaultSession["user"];
  }
}
