"use client";
import { QueryParameters } from "@/util_functions/getPropducts";
import React, { useEffect } from "react";
interface Props {
  query_parameters: QueryParameters;
}

export const Test: React.FC<Props> = ({ query_parameters }) => {
  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch(`/api/products`);
      const data = await response.json();
      console.log(data);
      //  setBooks(data);
    };
    getBooks();
  }, []);
  return <div>_test</div>;
};
