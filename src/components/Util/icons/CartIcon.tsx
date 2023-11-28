import React from "react";

interface Props {
  classes: string;
}

const CartIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default CartIcon;
