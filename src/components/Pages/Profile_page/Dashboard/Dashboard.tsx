import React from "react";

import { Order } from "@prisma/client";
import { Session } from "next-auth";
import User_card from "../util/user_card/User_card";
import Aside from "../util/aside/Aside";
import OrdringOverView from "./components/overView/OrdringOverView";

interface Props {
  orders: Order[] | [];
  session: Session;
}

const Dashboard = ({ orders, session }: Props) => {
  return (
    <div className="">
      <User_card session={session} />
      <OrdringOverView orders={orders} />
      <div className="block md:hidden">
        <Aside dashboard={true} session={session} />
      </div>
    </div>
  );
};

export default Dashboard;
