"use client";
import React from "react";
import NextImage from "next/image";

interface Props {
  image_url: string;
  title: string;
}
const Image = ({ image_url, title }: Props) => {
  return (
    <div className="w-auto h-[20rem] flex items-center justify-center  row-span-2">
      <NextImage src={image_url} alt={title} width={512} height={512} />
    </div>
  );
};

export default Image;
