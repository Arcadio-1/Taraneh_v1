import ArrowIcon, { Arrow } from "@/components/Util/ui/icons/ArrowIcon";
import React, { useState } from "react";

const Submit_discount_code = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="rounded-lg border px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="font-iranyekan_bold text-lg">کد تخفیف</h1>
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
          <div className="flex max-w-md rounded-lg border bg-white px-4 py-2">
            <input type="text" placeholder="اینجا بنویسید" className="grow" />
            <button>ثبت</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submit_discount_code;
