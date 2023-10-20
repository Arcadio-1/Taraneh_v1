import React from "react";

interface Props {
  classes: string;
}

const ClockIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm1-14v5.586l3.707 3.707-1.414 1.414-4-4A1 1 0 0111 12V6h2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ClockIcon;
