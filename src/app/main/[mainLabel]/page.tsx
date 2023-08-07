import { prisma } from "@/lib/db/prisma";
import { Specfic_cat } from "@/types/type";
import Link from "next/link";
import React from "react";

interface Props {
  params: { mainLabel: string };
}

const MainCategoryPage = async ({ params: { mainLabel } }: Props) => {
  const toolsSpecficCats: Specfic_cat[] = await prisma.main_cat.findMany({
    where: { label: "tools" },
    select: { Specific_cat: true, id: true, label: true, title: true },
  });
  return (
    <div>
      MainCategoryPage {mainLabel}
      <div>
        {toolsSpecficCats.map((main) => {
          return (
            <ul key={main.id} className="mt-5">
              <li className="font-bold text-red-700">
                <Link href={main.label}>{main.title}</Link>
              </li>
              {main.Specific_cat.map((spcfic) => {
                return (
                  <li key={spcfic.id}>
                    <Link href={spcfic.label}>{spcfic.title}</Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategoryPage;
