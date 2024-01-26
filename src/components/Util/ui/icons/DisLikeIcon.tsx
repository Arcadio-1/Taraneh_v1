import React from "react";

interface Props {
  classes: string;
}

const DisLikeIcon = ({ classes }: Props) => {
  return (
    <svg viewBox="0 0 24 24" className={`${classes}`}>
      <path
        fillRule="evenodd"
        d="M7.5 16l3.15 4.2a4.5 4.5 0 003.6 1.8 2.482 2.482 0 002.449-2.89L16.18 16h2.424a3 3 0 002.951-3.537l-.974-5.357A5 5 0 0015.661 3h-6.55a1 1 0 00-.428.096l-.824.39A1 1 0 007 3H3a1 1 0 00-1 1v11a1 1 0 001 1h4.5zm.5-2V5.633L9.336 5h6.326a3 3 0 012.951 2.463l.974 5.358A1 1 0 0118.603 14H15a1 1 0 00-.986 1.164l.712 4.274a.482.482 0 01-.476.562 2.5 2.5 0 01-2-1L8.8 14.4A1 1 0 008 14zm-2 0H4V5h2v9z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default DisLikeIcon;
