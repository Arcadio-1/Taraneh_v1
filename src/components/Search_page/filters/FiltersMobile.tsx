"use client";
import * as React from "react";
import { Brand } from "@prisma/client";
import { MainCatsWithSpecificCats, SortValue } from "@/types/type";
import Categories from "./components/categories";
import PriceRange from "./components/priceRange";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./components/AccordionStyled";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import Link from "next/link";
import FilterIcon from "@/components/Util/icons/FilterIcon";
import { Divider } from "@mui/material";

interface Props {
  brands: Brand[];
  mainCats: MainCatsWithSpecificCats[];
  searchQuery: string;
  bQ: string[];
  sort: SortValue;
  maxPrice: string;
  minPrice: string;
}

export default function FiltersMobile({
  brands,
  mainCats,
  searchQuery,
  sort,
  bQ,
  maxPrice,
  minPrice,
}: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [brandsList, setBrandsList] = React.useState<string[]>(bQ);
  const router = useRouter();

  React.useEffect(() => {
    router.push(
      `?${sort ? `sort=${sort}&` : ""}${
        !!searchQuery ? `searchQuery=${searchQuery}` : ""
      }${!!searchQuery && !!bQ ? "&" : ""}${
        !!minPrice && !!maxPrice
          ? `minPrice=${minPrice}&maxPrice=${maxPrice}&`
          : ``
      }${brandsList
        .map((item) => {
          return `bQ=${item}`;
        })
        .toString()
        .replaceAll(",", "&")}`
    );
    // }
  }, [brandsList, router, sort, searchQuery]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) {
      setBrandsList((prev) => {
        return (prev = [...prev, value]);
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setBrandsList((prev) => {
        return (prev = prev.filter((e) => e !== value));
      });
    }
  };
  const testHandler = () => {
    const url = `?${sort ? `sort=${sort}&` : ""}${
      !!searchQuery ? `searchQuery=${searchQuery}` : ""
    }${!!searchQuery && !!bQ ? "&" : ""}${brandsList
      .map((item) => {
        return `bQ=${item}`;
      })
      .toString()
      .replaceAll(",", "&")}`;
  };

  const expandHandler =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center">
            <FilterIcon clasess="w-8 h-8 fill-red" />
            <span className="text-xl font-iranyekan_bold cursor-pointer text-dark_2 px-2 py-1 rounded-lg ">
              فیلتر
            </span>
          </div>
        </SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader className="flex justify-between items-start mb-5">
            <SheetTitle className="font-iranyekan_bold text-xl text-dark_4">
              فیلتر ها
            </SheetTitle>
          </SheetHeader>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={expandHandler("panel1")}
            className={`!bg-transparent`}
          >
            <AccordionSummary
              className={`text-xl !bg-transparent`}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <p className="font-iranyekan_bold text-xl">دسته بندی ها</p>
            </AccordionSummary>
            <AccordionDetails className="!pt-0">
              <Categories
                searchQuery={searchQuery}
                sort={sort}
                mainCats={mainCats}
              />
            </AccordionDetails>
          </Accordion>
          {expanded === "panel1" && <Divider />}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={expandHandler("panel2")}
          >
            <AccordionSummary
              className={`text-xl !bg-transparent`}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <p className="font-iranyekan_bold text-xl">برند ها</p>
            </AccordionSummary>
            <AccordionDetails className=" flex flex-col gap-2 h-96 overflow-auto">
              {brands.map((brand) => {
                return (
                  <div key={brand.id} className="flex justify-between">
                    <div className="flex">
                      <input
                        className=" cursor-pointer"
                        type="checkbox"
                        checked={
                          brandsList
                            ? brandsList.indexOf(brand.title_en) !== -1
                            : false
                        }
                        id={brand.title_en}
                        value={brand.title_en}
                        onChange={handleChanges}
                      />
                      <label
                        htmlFor={brand.title_en}
                        className="text-lg cursor-pointer px-2"
                      >
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
              })}
            </AccordionDetails>
          </Accordion>
          {expanded === "panel2" && <Divider />}
          <Accordion
            expanded={expanded === "panel3"}
            onChange={expandHandler("panel3")}
          >
            <AccordionSummary
              className="!bg-transparent"
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <p className="font-iranyekan_bold text-xl">محدوده قیمت</p>
            </AccordionSummary>
            <AccordionDetails className="">
              <PriceRange
                bQ={bQ}
                searchQuery={searchQuery}
                sort={sort}
                maxPrice={maxPrice}
                minPrice={minPrice}
              />
            </AccordionDetails>
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}
