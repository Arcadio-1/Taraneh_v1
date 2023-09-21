import React from "react";

type Optinal_specification = [string, string];

const Attributes = () => {
  const attributes: Optinal_specification[] = [
    ["اتصال", "بلوتوث"],
    ["نوع گوشی", "دوگوشی"],
    ["قابلیت‌های مقاومتی", "مقاومت در برابر رطوبت و عرق"],
  ];
  return (
    <div>
      <p className="font-iranyekan_bold pb-3 text-lg">ویژگی ها</p>
      <ul className="pr-6 list-disc flex flex-col gap-3">
        {attributes.map((item, index) => {
          return (
            <li key={index} className="text-gray-500 text-lg">
              <span className="text-dark_2">{item[0]} : </span>
              <span className="text-dark_2 font-iranyekan_bold">{item[1]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Attributes;
