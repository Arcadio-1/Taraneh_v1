"use client";
import React from "react";
import ArrowIcon, { Arrow } from "../icons/ArrowIcon";

const ScrollToTopBtn = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex items-center gap-2 text-lg rounded-lg border px-8 py-4 text-dark_6 font-iranyekan_bold"
    >
      بازگشت به بالا
      <ArrowIcon classes="h-4 w-4 fill-dark_5" direction={Arrow.up} />
    </button>
  );
};

export default ScrollToTopBtn;
