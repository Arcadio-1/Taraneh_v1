import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      family: string;
    } & DefaultSession["user"];
  }
}
