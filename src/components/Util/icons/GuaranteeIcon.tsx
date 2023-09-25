import React from "react";

interface Props {
  classess: string;
}

const GuaranteeIcon = ({ classess }: Props) => {
  return (
    <svg viewBox="0 0 24 24" className={`${classess}`}>
      <path
        fillRule="evenodd"
        d="M4.725 4.038l7-2a1 1 0 01.55 0l7 2A1 1 0 0120 5v7.938a8 8 0 01-4.03 6.946l-3.474 1.984a1 1 0 01-.992 0L8.03 19.884A8 8 0 014 12.938V5a1 1 0 01.725-.962zM6 5.754v7.184a6 6 0 003.023 5.21l2.977 1.7 2.977-1.7A6 6 0 0018 12.937V5.754L12 4.04 6 5.754zm9 2.539l-3.793 3.793-1.793-1.793L8 11.707l2.5 2.5a1 1 0 001.414 0l4.5-4.5L15 8.293z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default GuaranteeIcon;
