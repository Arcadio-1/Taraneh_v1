import LoginForm from "@/components/Login/LoginForm";
import { prisma } from "@/lib/db/prisma";
import React from "react";

const page = async () => {
  // const signHandler = async (body: { phoneUmber: string }) => {
  // await prisma.user.createUser
  return (
    <div className="flex items-stretch md:items-center justify-center w-full h-[70vh] min-h-full mt-auto flex-col">
      <LoginForm />
    </div>
  );
};

export default page;
