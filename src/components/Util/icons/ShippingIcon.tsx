import React from "react";

interface Props {
  classes: string;
}

const ShippingIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 24 24">
      classes
      <path
        fillRule="evenodd"
        d="M14.17 19H8.83a3.001 3.001 0 01-5.66 0H2a1 1 0 01-1-1v-7.333C1 8.097 3.033 6 5.556 6H9V5a1 1 0 011-1h12a1 1 0 011 1v13a1 1 0 01-1 1h-2.17a3.001 3.001 0 01-5.66 0zm0-2H11V6h10v11h-1.17a3.001 3.001 0 00-5.66 0zM9 17h-.17a3.001 3.001 0 00-5.66 0H3v-3h5v-2H3v-1.333C3 9.187 4.151 8 5.556 8H9v9zm-2 1a1 1 0 11-2 0 1 1 0 012 0zm10 1a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default ShippingIcon;
