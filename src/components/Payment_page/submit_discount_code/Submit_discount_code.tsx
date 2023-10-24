import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import React, { useState } from "react";

const Submit_discount_code = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="border py-6 px-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-iranyekan_bold">کد تخفیف</h1>
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="flex items-center gap-2 text-g1_6"
            >
              اضافه کنید
              <ArrowIcon classes="h-4 w-4 fill-g1_6" direction={Arrow.down} />
            </button>
          )}
        </div>
        {showInput && (
          <div className="bg-white border max-w-md py-2 px-4 rounded-lg flex">
            <input type="text" placeholder="اینجا بنویسید" className="grow" />
            <button>ثبت</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submit_discount_code;
