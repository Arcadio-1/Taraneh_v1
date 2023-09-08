import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/Login_page/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-stretch md:items-center justify-center w-full h-[70vh] min-h-full mt-auto flex-col">
      <LoginForm />
    </div>
  );
};

export default page;
