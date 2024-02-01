"use client";
import React from "react";
import { Link } from "react-scroll";

const Nav = () => {
  return (
    <div className="sticky top-0 z-20 bg-white px-5 py-4">
      <ul className="flex gap-6 border-b py-5">
        <li className="cursor-pointer text-xl">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="px-4 pb-2"
            to="Introduction"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            معرفی
          </Link>
        </li>
        <li className="cursor-pointer text-xl">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="px-4 pb-2"
            to="Specifications"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            مشخصات
          </Link>
        </li>
        <li className="cursor-pointer text-xl">
          <Link
            activeClass="border-b-4 border-g1_5"
            className="px-4 pb-2"
            to="Reviews"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            دیدگاه
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
