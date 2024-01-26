import React from "react";

interface Props {
  classes: string;
}

const OrganazationCreditIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 40 40">
      <path d="M25 16.667H15V20h10v-3.333z"></path>
      <path
        fillRule="evenodd"
        d="M16.667 3.333a3.333 3.333 0 00-3.334 3.334V10h-5a5 5 0 00-5 5v15a5 5 0 005 5h23.334a5 5 0 005-5V15a5 5 0 00-5-5h-5V6.667a3.333 3.333 0 00-3.334-3.334h-6.666zm6.666 3.334V10h-6.666V6.667h6.666zM6.667 15v15c0 .92.746 1.667 1.666 1.667h23.334c.92 0 1.666-.747 1.666-1.667V15c0-.92-.746-1.667-1.666-1.667H8.333c-.92 0-1.666.747-1.666 1.667z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default OrganazationCreditIcon;
