import React, { Suspense } from "react";
import AdsliderContent from "./AdsliderContent";

const AdSlider = async () => {
  return (
    <Suspense fallback={<p>loading AdSlider</p>}>
      <AdsliderContent />
    </Suspense>
  );
};

export default AdSlider;
