import React from "react";

const Submit_gift_cart = () => {
  return (
    <div className="border py-6 px-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-iranyekan_bold">کارت هدیه</h1>
        </div>
        <div className="bg-white border max-w-md py-2 px-4 rounded-lg flex">
          <input
            type="text"
            placeholder="افزودن کارت هدیه جدید"
            className="grow"
          />
          <button>ثبت</button>
        </div>
      </div>
    </div>
  );
};

export default Submit_gift_cart;
