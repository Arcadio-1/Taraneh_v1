import React from "react";

interface Props {
  classes: string;
}
const CriditIcon = ({ classes }: Props) => {
  return (
    <svg className={`${classes}`} viewBox="0 0 40 40">
      <path d="M12.621 18.51a9.166 9.166 0 01-1.788 18.157v-2.5A6.667 6.667 0 104.166 27.5h-2.5a9.166 9.166 0 0110.955-8.99zM7.576 33.316a6.665 6.665 0 001.448.6l-.679 2.406a9.215 9.215 0 01-1.99-.825l1.22-2.181zm-1.978-1.69a6.68 6.68 0 001.108 1.109l-1.548 1.963a9.177 9.177 0 01-1.524-1.524l1.964-1.548zM4.417 29.31a6.675 6.675 0 00.6 1.448l-2.182 1.221a9.164 9.164 0 01-.824-1.99l2.406-.68zm7.25-6.81v5.488l2.255 2.256-1.178 1.179L10 28.679V22.5h1.666zM35 6.667A3.333 3.333 0 0138.333 10v16.667A3.333 3.333 0 0135 30H21.666v-3.333H35v-10H5V10a3.333 3.333 0 013.333-3.333H35zm-1.667 15v1.666h-6.666v-1.666h6.666zm0-3.334V20H21.667v-1.667h11.666zM35 10H8.333v3.333H35V10z"></path>
    </svg>
  );
};

export default CriditIcon;
