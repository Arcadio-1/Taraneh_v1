import { Products } from "@/components/Pages/Admin_dash/products/Products";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <Suspense fallback={<p>loading products</p>}>
        <Products />
      </Suspense>
    </div>
  );
};

export default page;
