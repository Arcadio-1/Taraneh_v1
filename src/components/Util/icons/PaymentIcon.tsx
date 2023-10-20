import React from "react";

interface Props {
  classes: string;
}

const PaymentIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 14 15">
      <path d="M8.875 8.375a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
      <path
        fillRule="evenodd"
        d="M12.086 3.5l-.216-.86A2.25 2.25 0 008.976 1.05L1.406 3.54A1.5 1.5 0 00.25 5v8.25a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V5a1.5 1.5 0 00-1.5-1.5h-.164zM1.75 5h10.5v2.25H8.875a1.875 1.875 0 100 3.75h3.375v2.25H1.75V5zm4.622-1.5h4.167l-.124-.497-.016-.055a.75.75 0 00-.949-.474L6.372 3.5zM8.875 8h3.375v2.25H8.875a1.125 1.125 0 010-2.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default PaymentIcon;
