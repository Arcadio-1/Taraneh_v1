import React from "react";
import Products from "../Products/Products";
import Not_found from "../Products/Not_found";
import PageinationBar from "../paginationBar/pageinationBar";
import { QueryParameters, getProducts } from "@/util_functions/getPropducts";

interface Props {
  query_parameters: QueryParameters;
}

const Content: React.FC<Props> = async ({ query_parameters }) => {
  const { currentPage, totalPages, products } =
    await getProducts(query_parameters);

  return (
    <div>
      {!!products.length ? <Products products={products} /> : <Not_found />}
      {!!totalPages && (
        <PageinationBar
          bQ={query_parameters.bQ}
          sort={query_parameters.sort}
          searchQuery={query_parameters.searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
          maxPrice={query_parameters.maxPrice}
          minPrice={query_parameters.minPrice}
        />
      )}
    </div>
  );
};

export default Content;
