import React from "react";
import { cn } from "../../../../lib/utils";

import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const ShowIcon = ({ className }: Props) => {
  return (
    <svg
      className={cn("h-7 w-7 cursor-pointer fill-dark_4", className)}
      viewBox="0 0 24 24"
    >
      <path d="M12 16C9.80001 16 8.00001 14.2 8.00001 12C8.00001 9.8 9.80001 8 12 8C14.2 8 16 9.8 16 12C16 14.2 14.2 16 12 16ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" />
      <path d="M12 19C6.50001 19 3.30001 13.2 3.10001 13C2.90001 12.7 2.90001 12.3 3.10001 12C3.20001 11.8 6.50001 6 12 6C17.5 6 20.7 11.8 20.9 12C21.1 12.3 21.1 12.7 20.9 13C20.7 13.2 17.5 19 12 19ZM5.20001 12.5C6.00001 13.8 8.50001 17 12 17C15.5 17 18 13.8 18.8 12.5C18 11.2 15.5 8 12 8C8.50001 8 6.00001 11.2 5.20001 12.5Z" />
    </svg>
  );
};

export default ShowIcon;
