import React from "react";

import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SortIcon = ({ className }: Props) => {
  return (
    <svg viewBox="0 0 256 256" className={className}>
      <polyline
        fill="none"
        points="144 168 184 208 224 168"
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <line
        fill="none"
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="184"
        x2="184"
        y1="112"
        y2="208"
      />
      <line
        fill="none"
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="48"
        x2="120"
        y1="128"
        y2="128"
      />
      <line
        fill="none"
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="48"
        x2="184"
        y1="64"
        y2="64"
      />
      <line
        fill="none"
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        x1="48"
        x2="104"
        y1="192"
        y2="192"
      />
    </svg>
  );
};

export default SortIcon;
