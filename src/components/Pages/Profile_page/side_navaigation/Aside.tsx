import React from "react";
import { Session } from "next-auth";
import User_card from "../user_card/User_card";
import Navigation from "../navigation/Navigation";
import Divider from "@/components/Util/ui/Divider";

interface Props {
  session: Session;
  root?: boolean;
}
const Aside = ({ session, root }: Props) => {
  return (
    <div className="mt-10 rounded-lg border md:m-0">
      <div className="hidden md:block">
        <User_card session={session} />
      </div>
      <Navigation root={root} />
    </div>
  );
};

export default Aside;
