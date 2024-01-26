import React from "react";

import Sport_image from "@/assets/images/Drink_filters/sport.jpg";
import Exam_image from "@/assets/images/Drink_filters/exam.jpg";
import Energy_image from "@/assets/images/Drink_filters/energy.jpg";
import Employe_image from "@/assets/images/Drink_filters/employe.jpg";
import Image from "next/image";

const Cat_by_statistics__drinks = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Image
          className="w-full"
          src={Sport_image}
          height={200}
          width={400}
          alt="Sport"
        />
        <Image
          className="w-full"
          src={Exam_image}
          height={200}
          width={400}
          alt="Exam"
        />
        <Image
          className="w-full"
          src={Energy_image}
          height={200}
          width={400}
          alt="Energy"
        />
        <Image
          className="w-full"
          src={Employe_image}
          height={200}
          width={400}
          alt="Employe"
        />
      </div>
    </div>
  );
};

export default Cat_by_statistics__drinks;
