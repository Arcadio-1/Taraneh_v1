import { cn } from "@/lib/utils";
import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const HomeIcon = ({ className }: Props) => {
  return (
    <svg
      className={cn("h-7 w-7 cursor-pointer fill-slate-300", className)}
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M13.977 2.744a3 3 0 00-4.098.135l-8.586 8.585 1.414 1.415L4 11.586v6.586l.005.176A3 3 0 007 21.172h10l.176-.006A3 3 0 0020 18.172v-6.586l1.293 1.293 1.414-1.415-8.586-8.585-.144-.135zM18 9.586l-5.293-5.293a1 1 0 00-1.32-.083l-.094.083L6 9.586v8.586a1 1 0 00.883.993l.117.007h10a1 1 0 00.993-.884l.007-.116V9.586zm-3 1.586h-1a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default HomeIcon;
