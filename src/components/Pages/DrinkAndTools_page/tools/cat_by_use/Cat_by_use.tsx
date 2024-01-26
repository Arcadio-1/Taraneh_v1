import React from "react";

import Work from "@/assets/images/Tools_filter/work.png";
import SemiWork from "@/assets/images/Tools_filter/semiWork.png";
import Home from "@/assets/images/Tools_filter/home.png";
import Image from "next/image";

const Cat_by_use = () => {
  const using_typs = [
    {
      id: "0",
      title: "ابزار صنعتی",
      image: Work,
    },
    {
      id: "2",
      title: "ابزار نیمه صنعتی",
      image: SemiWork,
    },
    {
      id: "3",
      title: "ابزار خانگی",
      image: Home,
    },
  ];

  return (
    <div>
      <h1 className="font-bold text text-dark_2 font-iranyekan_bold text-2xl mb-4">
        انتخاب بر اساس کاربرد
      </h1>
      <div className="flex justify-between gap-3 flex-wrap items-center">
        {using_typs.map((use) => {
          return (
            <div
              key={use.id}
              className="flex flex-col items-center justify-between grow rounded-lg bg-gradient-to-bl from-amber-700 min-w-[20rem]"
            >
              <Image
                className="rounded-xl"
                src={use.image}
                height={100}
                width={150}
                alt="Exam"
              />
              <div className="bg-amber-700 w-full text-center pt-1 pb-4 rounded-lg bg-opacity-80">
                <h2 className="text-2xl font-iranyekan_bold text-slate-100 pt-3">
                  {use.title}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cat_by_use;
