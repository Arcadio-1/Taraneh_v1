import Slider from "@/components/Util/products_Slider/Products_Slider";
import { AllCatsTopsViewProducts } from "@/types/type";
import React from "react";

interface Props {
  lists_of_lists: AllCatsTopsViewProducts[];
}

const Main_cat_slider = ({ lists_of_lists }: Props) => {
  return (
    <section>
      {lists_of_lists.map((catProducts) => {
        return (
          <div key={Math.random()} className=" border-b-2 border-gray-50">
            <Slider
              heroSlide={{
                image_url: catProducts[0].main_cat.image,
                link_url: `main/${catProducts[0].main_cat.label}`,
                title: `پرفروش ترین ${catProducts[0].main_cat.title}`,
              }}
              bg_color={`bg-g1_1`}
              products={catProducts}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Main_cat_slider;
