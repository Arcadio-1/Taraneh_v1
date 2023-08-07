import { prisma } from "@/lib/db/prisma";
import React from "react";

interface Props {
  params: { specificLabel: string };
}

const SpecficCategoryPage = async ({ params: { specificLabel } }: Props) => {
  //show specfic category Products in here
  const coffeeBeains = await prisma.specific_cat.findMany({
    where: { label: "coffee-bean" },
    select: { products_id: true },
  });
  return <div>SpecficCategoryPage {specificLabel}</div>;
};

export default SpecficCategoryPage;
