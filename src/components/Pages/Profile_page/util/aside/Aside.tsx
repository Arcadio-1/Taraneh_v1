import React from "react";
import { Session } from "next-auth";
import User_card from "../user_card/User_card";
import Navigation from "./navigation/Navigation";
import { T_panelAsideLinks } from "@/types_validation/type";

interface Props {
  session: Session;
  links: T_panelAsideLinks[];
  dashboard?: boolean;
}
const Aside = ({ session, dashboard, links }: Props) => {
  return (
    <div className="mt-10 rounded-lg border md:m-0">
      <div className="hidden md:block">
        <User_card session={session} />
      </div>
      <Navigation links={links} dashboard={dashboard} />
    </div>
  );
};

export default Aside;
