import React from "react";
import { Session } from "next-auth";
import User_card from "../user_card/User_card";
import Navigation from "../navigation/Navigation";
import { Divider } from "@mui/material";

interface Props {
  session: Session;
}
const Aside = ({ session }: Props) => {
  return (
    <div className="col-span-2 border border-red-600">
      <User_card session={session} />
      <Navigation />
    </div>
  );
};

export default Aside;
