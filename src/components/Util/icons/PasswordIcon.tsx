import React from "react";
import { cn } from "../../../lib/utils";

import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const PasswordIcon = () => {
  return (
    <svg className={"h-7 w-7 cursor-pointer fill-dark_4"} viewBox="0 0 48 48">
      <path d="M0 0h48v48h-48z" fill="none" />
      <path d="M25.3 20c-1.65-4.66-6.08-8-11.3-8-6.63 0-12 5.37-12 12s5.37 12 12 12c5.22 0 9.65-3.34 11.3-8h8.7v8h8v-8h4v-8h-20.7zm-11.3 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  );
};

export default PasswordIcon;
