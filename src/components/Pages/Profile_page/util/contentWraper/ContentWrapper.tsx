import React from "react";

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-8 mx-3 rounded-lg border px-2 py-5 md:col-span-6">
      {children}
    </div>
  );
};

export default ContentWrapper;
