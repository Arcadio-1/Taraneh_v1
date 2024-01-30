import React from "react";

const RssEmail = () => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="yourEmail" className=" font-iranyekan_bold text-xl">
        با ثبت ایمیل, از جدید ترین ایمیل ها باخبر شوید
      </label>
      <div className="flex items-center gap-4">
        <input
          name="yourEmail"
          id="yourEmail"
          type="text"
          placeholder="ایمیل شما"
          className="min-w-[20rem] rounded-lg bg-slate-100 p-4 font-iranyekan_bold text-lg"
        />
        <button className="rounded-lg bg-slate-300 px-6 py-4 font-iranyekan_bold text-lg text-white">
          ثبت
        </button>
      </div>
    </div>
  );
};

export default RssEmail;
