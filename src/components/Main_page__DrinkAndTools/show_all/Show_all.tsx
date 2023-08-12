import Image from "next/image";
import React from "react";

interface Props {
  image_url: string;
  alt: string;
  label: string;
}

const Show_all = ({ image_url, alt, label }: Props) => {
  return (
    <div className="flex items-center gap-2 justify-center px-5 py-2 bg-amber-600 rounded-xl">
      <div className="flex items-center">
        <h1 className="text-3xl font-iranyekan_bold text-light_2">{label}</h1>
        <svg viewBox="0 0 96 96" className="h-8 w-8">
          <path
            className="fill-gray-50"
            d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
          />
        </svg>
      </div>
      <Image src={image_url} width={100} height={100} alt={alt} />
    </div>
  );
};

export default Show_all;
