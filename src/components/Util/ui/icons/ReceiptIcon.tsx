import React from "react";

interface Props {
  clasess: string;
}

const ReceiptIcon = ({ clasess }: Props) => {
  return (
    <svg className={`${clasess}`} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M18 2H7a4 4 0 00-4 4v15a1 1 0 001.555.832L7 20.202l2.445 1.63a1 1 0 001.11 0L13 20.202l2.445 1.63A1 1 0 0017 21V5.5a1.5 1.5 0 013 0V14h-1v2h2a1 1 0 001-1V5.5a3.5 3.5 0 00-4-3.465V2zm-3 3.5v13.631l-1.445-.963a1 1 0 00-1.11 0L10 19.798l-2.445-1.63a1 1 0 00-1.11 0L5 19.13V6a2 2 0 012-2h8.337A3.486 3.486 0 0015 5.5zM13 8H7V6h6v2zm-6 4h6v-2H7v2zm6 4H7v-2h6v2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ReceiptIcon;
