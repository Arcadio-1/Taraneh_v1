import React from "react";
import { cn } from "../../../lib/utils";

import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SpinnerIcon = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        className,
      )}
      role="status"
    ></div>
  );
};

export default SpinnerIcon;
