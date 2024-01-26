import React from "react";

interface Props {
  classes: string;
}

const CartBankIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 40 40">
      <path d="M20 20v1.666h11.667V20H20zM25 25v-1.667h6.667V25H25z"></path>
      <path
        fillRule="evenodd"
        d="M33.334 8.333a3.333 3.333 0 013.333 3.333v16.667a3.333 3.333 0 01-3.334 3.333H6.668a3.333 3.333 0 01-3.333-3.333V11.666a3.333 3.333 0 013.333-3.333h26.666zm-26.667 10v10h26.666v-10H6.668zM33.333 15H6.668v-3.334h26.666V15z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default CartBankIcon;
