"use client";
import React from "react";

const RefreshButton = () => {
  return (
    <button
      onClick={() => {
        location.reload();
      }}
      type="submit"
      className="rounded-lg bg-g1_5 px-8 py-2 text-light_1"
    >
      تلاش مجدد!
    </button>
  );
};

export default RefreshButton;
