import { Edit2Icon, Edit3Icon } from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import Name_family_codeMeli from "./components/Name_family_codeMeli";

interface Props {
  session: Session;
}

const Personal_info = ({ session }: Props) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-between">
        <div>
          <p>*********{session.user.name}********</p>
          <p className="text-lg">نام و نام خانوادگی</p>
          {!!session.user.name && !!session.user.family && (
            <div>
              <p>
                <span>{session.user.name}</span>
                <span>{session.user.family}</span>
              </p>
            </div>
          )}
          {(!session.user.name || !session.user.family) && (
            <div>
              <p className="text-red-600">تکمیل مشخصات!</p>
            </div>
          )}
        </div>
        <div>
          <Name_family_codeMeli userId={session.user.id} />
        </div>
      </div>
    </div>
  );
};

export default Personal_info;
