"use client";
import React from "react";
import Image from "next/image";

interface Props {
  image_url: string;
  title: string;
}
const ImageComponent = ({ image_url, title }: Props) => {
  return (
    <div className=" p-5 flex items-center justify-center  row-span-2">
      <Image src={image_url} alt={title} width={512} height={512} />
    </div>
  );
};

export default ImageComponent;
