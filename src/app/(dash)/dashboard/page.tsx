import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
// import Chart_admin_dash from "@/components/Pages/Admin_dash/chart/Chart_admin_dash";
// import TestingOptimistic from "@/components/Util/components/orderControl/TestingOptimistic";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {/* <TestingOptimistic /> */}
      {/* <Chart_admin_dash /> */}
    </div>
  );
};

export default page;
