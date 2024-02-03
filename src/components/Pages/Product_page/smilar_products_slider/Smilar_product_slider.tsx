import React, { Suspense } from "react";
import Smilar_product_sliderContent from "./Smilar_product_sliderContent";

type Props = {
  title: string;
};

const Smilar_product_slider = async ({ title }: Props) => {
  return (
    <Suspense fallback={<p>Loading similar products</p>}>
      <Smilar_product_sliderContent title={title} />;
    </Suspense>
  );
};

export default Smilar_product_slider;
