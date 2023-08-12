import React from "react";

import Work from "@/assets/images/Tools_filter/work.png";
import SemiWork from "@/assets/images/Tools_filter/semiWork.png";
import Home from "@/assets/images/Tools_filter/home.png";
import Image from "next/image";

const Cat_by_use = () => {
  return (
    <div>
      <h1 className="font-bold text text-dark_2 font-iranyekan_bold text-2xl mb-4">
        انتخاب بر اساس کاربرد
      </h1>
      <div className="flex justify-between gap-3 max-sm:flex-col items-stretch">
        <div className="max-w-[40rem] w-full h-auto grow p-3 rounded-xl flex bg-gradient-to-bl from-amber-700 justify-evenly">
          <h2 className="text-2xl font-iranyekan_bold text-slate-100 pt-3">
            ابزار صنعتی
          </h2>
          <Image
            className="rounded-xl w-full max-w-[12rem]"
            src={Work}
            height={200}
            width={450}
            alt="Exam"
          />
        </div>
        <div className="max-w-[40rem] w-full h-auto grow p-3 rounded-xl flex bg-gradient-to-bl from-amber-700 justify-evenly">
          <h2 className="text-2xl font-iranyekan_bold text-slate-100 pt-3">
            ابزار نیمه صنعتی
          </h2>
          <Image
            className="rounded-xl w-full max-w-[12rem]"
            src={SemiWork}
            height={200}
            width={450}
            alt="Energy"
          />
        </div>
        <div className="max-w-[40rem] w-full h-auto grow p-3 rounded-xl flex bg-gradient-to-bl from-amber-700 justify-evenly">
          <h2 className="text-2xl font-iranyekan_bold text-slate-100 pt-3">
            ابزار خانگی
          </h2>
          <Image
            className="rounded-xl w-full max-w-[12rem]"
            src={Home}
            height={200}
            width={450}
            alt="Employe"
          />
        </div>
      </div>
    </div>
  );
};

export default Cat_by_use;
