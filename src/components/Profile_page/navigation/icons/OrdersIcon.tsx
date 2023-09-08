import React from "react";
interface StylingClasses {
  className?: string;
}
const OrdersIcon = ({ className }: StylingClasses) => {
  return (
    <svg className={` ${className}`} viewBox="0 0 256 256">
      <rect fill="none" height="256" width="256" />
      <path
        d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        fill="none"
        points="177 152.5 177 100.5 80 47"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        fill="none"
        points="222.9 74.6 128.9 128 33.1 74.6"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
        x1="128.9"
        x2="128"
        y1="128"
        y2="234.8"
      />
    </svg>
  );
};

export default OrdersIcon;

// <?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline fill="none" points="177 152.5 177 100.5 80 47" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polyline fill="none" points="222.9 74.6 128.9 128 33.1 74.6" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="128.9" x2="128" y1="128" y2="234.8"/></svg>
