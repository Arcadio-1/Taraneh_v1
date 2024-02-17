"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Log = () => {
  const pathname = usePathname();

  return (
    <div>
      <Link
        href={`/users/login/?callback=${pathname}`}
        className="flex items-center gap-1 border-2 px-6 py-2 rounded-xl cursor-pointer"
      >
        <svg
          className="h-10 w-10 stroke-dark_3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" stroke="none" />
          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M20 12h-13l3 -3m0 6l-3 -3" />
        </svg>
        <button>
          <span className="text-lg font-iransansbold text-dark_3">ورود</span>
          <span className="text-lg font-iransansbold text-dark_3"> | </span>
          <span className="text-lg font-iransansbold text-dark_3">ثبت نام</span>
        </button>
      </Link>
    </div>
  );
};

export default Log;
