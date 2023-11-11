import React from "react";

interface Props {
  classes: string;
}

const DotIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="8" />
      <rect
        data-name="&lt;Transparent Rectangle&gt;"
        height="32"
        width="32"
        fill="none"
      />
    </svg>
  );
};

export default DotIcon;
