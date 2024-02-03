import { cn } from "@/lib/utils";
import React from "react";

type Props = React.HTMLAttributes<HTMLHRElement>;

const Divider = ({ className }: Props) => {
  return <hr className={cn("", className)}></hr>;
};

export default Divider;
