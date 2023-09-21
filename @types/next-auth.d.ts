import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      family: string;
      id: string;
      email: string;
      address: string;
      state: string;
      city: string;
      code_meli: string;
      role: Role;
      image: string;
    } & DefaultSession["user"];
  }
}
