import React from "react";
interface Props {
  clasess: string;
}
const MenuIcon = ({ clasess }: Props) => {
  return (
    <svg viewBox="0 0 512 512" className={`${clasess}`}>
      <path d="M441.13,166.52h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
      <path d="M441.13,279.72h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
      <path d="M441.13,392.92h-372a15,15,0,1,1,0-30h372a15,15,0,0,1,0,30Z" />
    </svg>
  );
};

export default MenuIcon;
