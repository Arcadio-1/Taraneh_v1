"use client";
import React from "react";
import Image from "next/image";

interface Props {
  image_url: string;
  title: string;
}
const ImageComponent = ({ image_url, title }: Props) => {
  return (
    <div className="pt-5 pb-5 pl-5 md:pr-5 flex items-center justify-center  row-span-2">
      <Image src={image_url} alt={title} width={512} height={512} />
    </div>
  );
};

export default ImageComponent;
