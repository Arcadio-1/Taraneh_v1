import React from "react";
interface Props {
  clasees?: string;
}
const MenuIcon = ({ clasees }: Props) => {
  return (
    <svg viewBox="0 0 512 512" className={`${clasees}`}>
      <title />
      <g data-name="1" id="_1">
        <path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
        <path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
        <path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
      </g>
    </svg>
  );
};

export default MenuIcon;
