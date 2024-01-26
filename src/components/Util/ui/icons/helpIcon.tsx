import React from "react";

interface Props {
  classes?: string;
}

const HelpIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M8 2h8a6 6 0 016 6v8a6 6 0 01-6 6H8a6 6 0 01-6-6V8a6 6 0 016-6zm0 2a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4H8zm2 6H8V9a3 3 0 013-3h2a3 3 0 013 3v.93a3 3 0 01-1.336 2.496l-1.219.812a1 1 0 00-.445.832V15h-2v-.93a3 3 0 011.336-2.496l1.219-.812A1 1 0 0014 9.93V9a1 1 0 00-1-1h-2a1 1 0 00-1 1v1zm1 6h2v2h-2v-2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default HelpIcon;
