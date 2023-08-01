import React from "react";
import Image from "next/image";
import { ProductWithStatistics } from "@/types/type";

const Product_card = ({
  title,
  image_url,
  createdAt,
  off_percent,
  price,
  status,
  brandEn,
  brandFn,
  id,
  product_statistics,
}: ProductWithStatistics) => {
  const test = product_statistics;
  return (
    <div className="card w-96 glass">
      {/* <figure>
        <Image width={250} height={250} src={image_url} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div> */}
    </div>
  );
};

export default Product_card;
