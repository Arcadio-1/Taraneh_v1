import Link from "next/link";
import React from "react";

export interface BreadcrumbsType {
  title: string;
  link: string;
}

interface Props {
  list?: BreadcrumbsType[];
}
const Breadcrumbs = ({ list }: Props) => {
  return (
    <div className="my-4 mt-10">
      <ul className="flex items-center gap-2">
        <li className="flex items-center">
          <Link href="/search" className="text-[1.1rem] text-dark_5">
            همه محصولات
          </Link>
          <svg viewBox="0 0 96 96" className="w-5 h-5 fill-dark_5">
            <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
          </svg>
        </li>
        {list?.map((item, index) => {
          return (
            <li key={index} className="flex items-center">
              <Link className="text-[1.1rem] text-dark_5" href={item.link}>
                {item.title}
              </Link>
              {list.length !== ++index && (
                <svg viewBox="0 0 96 96" className="w-5 h-5 fill-dark_5">
                  <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
