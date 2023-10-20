import Checkout_header, {
  Stage,
} from "@/components/Util/checkout_header/Checkout_header";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1024px] mx-auto mt-6 flex flex-col gap-2 px-4">
      <Checkout_header stage={Stage.payment} />
    </div>
  );
};

export default page;
