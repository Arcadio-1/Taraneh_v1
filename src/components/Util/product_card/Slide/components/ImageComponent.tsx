"use client";
import Image from "next/image";
import React from "react";
interface Props {
  image_url: string;
  title: string;
}
const ImageComponent = ({ image_url, title }: Props) => {
  return (
    <div className="flex items-center justify-center row-span-2">
      <Image src={image_url} alt={title} width={150} height={150} />
    </div>
  );
};

export default ImageComponent;
