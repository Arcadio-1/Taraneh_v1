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
          <Link href="/search" className="text-lg text-dark_5">
            همه محصولات
          </Link>
          <span className="px-2">/</span>
        </li>
        {list?.map((item, index) => {
          return (
            <li key={index} className="flex items-center">
              <Link className="text-[1.1rem] text-dark_5" href={item.link}>
                {item.title}
              </Link>
              {list.length !== ++index && <span className="px-2">/</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
