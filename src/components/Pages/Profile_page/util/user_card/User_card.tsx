import { Edit3Icon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

interface Props {
  session: Session;
}

const User_card = ({ session }: Props) => {
  const { user } = session;
  return (
    <div className="m-2 flex items-center justify-between border-b-[1.3px] px-3 py-4">
      <div className="flex items-center gap-3">
        {user.name && user.family && (
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-iranyekan_bold text-xl text-dark_2">
                {user.name}
              </span>
              <span> </span>
              <span className="font-iranyekan_bold text-xl text-dark_2">
                {user.family}
              </span>
            </p>
            <p className="font-iransansnum text-xl text-dark_4">{user.phone}</p>
          </div>
        )}
        {!user.name || (!user.family && <p>{user.phone}</p>)}
      </div>
      <Link href={"/profile/user-info"}>
        <Edit3Icon className="h-6 w-6 stroke-g1_7" />
      </Link>
    </div>
  );
};

export default User_card;
