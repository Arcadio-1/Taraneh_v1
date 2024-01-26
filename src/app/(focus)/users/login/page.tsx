import { authOptions } from "@/lib/auth/authOptions";
import LoginForm from "@/components/Pages/Login_page/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="mt-auto flex h-[70vh] min-h-full w-full flex-col items-stretch justify-center md:items-center">
      <LoginForm />
    </div>
  );
};

export default page;
