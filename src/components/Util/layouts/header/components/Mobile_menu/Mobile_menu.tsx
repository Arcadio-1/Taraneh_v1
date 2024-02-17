import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Mobile_menu_content } from "./Mobile_menu_content";
import { MainCatsWithSpecificCats } from "@/types_validation/type";

const getCats = React.cache(async () => {
  try {
    const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
      include: { Specific_cat: true },
    });
    if (!cats) {
      return notFound();
    }
    return cats;
  } catch (error) {
    return notFound();
  }
});

export const Mobile_menu = async () => {
  const cats = await getCats();
  return <Mobile_menu_content cats={cats} />;
};
