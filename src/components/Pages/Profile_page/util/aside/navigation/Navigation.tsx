import Link from "next/link";
import React from "react";
import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import LogoutButton from "./LogoutButton";
import { T_panelAsideLinks } from "@/types_validation/type";

interface Props {
  links: T_panelAsideLinks[];
  dashboard?: boolean;
}

const Navigation = ({ dashboard = false, links }: Props) => {
  return (
    <ul className="p-2 ">
      {links.map((item) => {
        return (
          <li
            key={item.id}
            className={`${
              dashboard && item.id === "1" ? "hidden" : ""
            } border-b-[1px] border-b-gray-100 last:bg-red-600 hover:bg-gray-100`}
          >
            <Link
              href={item.link}
              className="mx-2 flex justify-between px-2 py-2"
            >
              <div className="flex items-center gap-2">
                {!!item.icon && item.icon}
                <span className="text-lg">{item.title}</span>
              </div>
              <ArrowIcon classes="h-5 w-5 fill-dark_4" direction={Arrow.left} />
            </Link>
          </li>
        );
      })}
      <li className=" px-2 py-2 hover:bg-gray-100">
        <LogoutButton />
      </li>
    </ul>
  );
};
export default Navigation;
