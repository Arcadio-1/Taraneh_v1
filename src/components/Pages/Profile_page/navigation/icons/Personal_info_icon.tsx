import React from "react";

interface StylingClasses {
  className?: string;
}

const Personal_info = ({ className }: StylingClasses) => {
  return (
    <svg className={`${className}`} viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2a5 5 0 015 5v1A5 5 0 017 8V7a5 5 0 015-5zm9.996 18.908C21.572 16.318 18.096 14 12 14c-6.095 0-9.572 2.318-9.996 6.908A1 1 0 003 22h18a1 1 0 00.996-1.092zM4.188 20c.728-2.677 3.231-4 7.812-4 4.58 0 7.084 1.323 7.812 4H4.188zM9 7a3 3 0 116 0v1a3 3 0 01-6 0V7z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Personal_info;
