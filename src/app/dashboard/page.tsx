import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";

const page = async () => {
  const session = await getServerSession(authOptions);

  return <div>page</div>;
};

export default page;
