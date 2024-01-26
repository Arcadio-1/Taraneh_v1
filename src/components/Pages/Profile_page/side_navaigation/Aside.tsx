import React from "react";
import { Session } from "next-auth";
import User_card from "../user_card/User_card";
import Navigation from "../navigation/Navigation";
import { Divider } from "@mui/material";

interface Props {
  session: Session;
  root?: boolean;
}
const Aside = ({ session, root }: Props) => {
  return (
    <div className="border rounded-lg mt-10 md:m-0">
      <div className="hidden md:block">
        <User_card session={session} />
      </div>
      <Navigation root={root} />
    </div>
  );
};

export default Aside;
