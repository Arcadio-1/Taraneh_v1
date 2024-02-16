import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth/authOptions";
import TestingEnvirment2 from "@/components/Util/testingEvirment/TestingEnvirment2";
// import Chart_admin_dash from "@/components/Pages/Admin_dash/chart/Chart_admin_dash";
// import TestingOptimistic from "@/components/Util/components/orderControl/TestingOptimistic";

const page = async () => {
  const session = await getServerSession(authOptions);
  const test = null;
  let test2: undefined;
  if (test === undefined) {
    console.log(typeof test2);
    console.log("true");
  } else {
    console.log(typeof test2);
    console.log("false");
  }

  return (
    <div>
      {/* <TestingEnvirment1 /> */}
      <TestingEnvirment2 />
      {/* <TestingOptimistic /> */}
      {/* <Chart_admin_dash /> */}
    </div>
  );
};

export default page;
