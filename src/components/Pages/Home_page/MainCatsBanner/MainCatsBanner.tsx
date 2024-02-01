import React from "react";
import Title from "./components/Title";
import { Main_cat } from "@prisma/client";
import List from "./components/List";

interface Props {
  main_cats: Main_cat[];
}

const MainCatsBanner = ({ main_cats }: Props) => {
  return (
    <section className=" p-2">
      {/* <Title /> */}
      <List main_cats={main_cats} />
    </section>
  );
};

export default MainCatsBanner;
