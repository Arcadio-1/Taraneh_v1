import { useGlobalContext } from "@/app/(provider)/Provider";
import { SortValue } from "@/types/type";
import { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface Props {
  brand: Brand;
  searchQuery: string;
  bQ: string[];
  sort: SortValue;
  maxPrice: string;
  minPrice: string;
  page: string;
}

const Brands = ({
  brand,
  sort,
  bQ,
  maxPrice,
  minPrice,
  page,
  searchQuery,
}: Props) => {
  const { brand_list_filter, set_brand_list_filter } = useGlobalContext();
  const router = useRouter();
  const hasBenPageRendered = useRef(false);
  const pusher = () => {
    router.push(
      `?${sort ? `sort=${sort}&` : ""}${
        !!searchQuery ? `searchQuery=${searchQuery}` : ""
      }${!!searchQuery && !!bQ ? "&" : ""}${
        !!minPrice && !!maxPrice
          ? `minPrice=${minPrice}&maxPrice=${maxPrice}&`
          : ``
      }${brand_list_filter
        .map((item) => {
          return `bQ=${item}`;
        })
        .toString()
        .replaceAll(",", "&")}${page && brand_list_filter.length ? "&" : ""}${
        page ? `page=${page}` : ""
      }`
    );
  };

  React.useEffect(() => {
    if (hasBenPageRendered.current) {
      pusher();
    }
    hasBenPageRendered.current = true;
  }, [brand_list_filter]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) {
      set_brand_list_filter((prev) => {
        return (prev = [...prev, value]);
      });
    }
    // Case 2  : The user unchecks the box
    else {
      set_brand_list_filter((prev) => {
        return (prev = prev.filter((e) => e !== value));
      });
    }
  };

  return (
    <div
      key={brand.id}
      className="flex justify-between md:items-center md:pb-3"
    >
      <div className="flex md:items-center">
        <input
          className="w-6 h-6 cursor-pointer"
          type="checkbox"
          checked={
            brand_list_filter
              ? brand_list_filter.indexOf(brand.title_en) !== -1
              : false
          }
          id={brand.title_en}
          value={brand.title_en}
          onChange={handleChanges}
        />
        <label htmlFor={brand.title_en} className="text-lg cursor-pointer px-2">
          {brand.title_fr}
        </label>
      </div>
      <label
        htmlFor={brand.title_en}
        className="text-lg grow text-left cursor-pointer"
      >
        {brand.title_en}
      </label>
    </div>
  );
};

export default Brands;
