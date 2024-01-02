"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Brand } from "@prisma/client";
import { MainCatsWithSpecificCats, SortValue } from "@/types/type";
import Categories from "./components/categories";
import PriceRange from "./components/priceRange";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "./components/AccordionStyled";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components_shadcn/ui/sheet";
import FilterIcon from "@/components/Util/icons/FilterIcon";
import { Divider } from "@mui/material";
import { useGlobalContext } from "@/app/(provider)/Provider";
interface Props {
  brands: Brand[];
  mainCats: MainCatsWithSpecificCats[];
  searchQuery: string;
  bQ: string[];
  sort: SortValue;
  maxPrice: string;
  minPrice: string;
  page: string;
}

export default function Filters({
  brands,
  mainCats,
  searchQuery,
  sort,
  bQ,
  maxPrice,
  minPrice,
  page,
}: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  // const [brand_list_filter, set_brand_list_filter] = React.useState<string[]>(bQ);
  const { brand_list_filter, set_brand_list_filter } = useGlobalContext();

  React.useEffect(() => {
    set_brand_list_filter(bQ);
  }, [bQ, set_brand_list_filter]);

  const router = useRouter();

  React.useEffect(() => {
    console.log("runing");
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
    // }
  }, [brand_list_filter, router, sort, searchQuery]);

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
    // router.push(
    //   `?${sort ? `sort=${sort}&` : ""}${
    //     !!searchQuery ? `searchQuery=${searchQuery}&` : ""
    //   }${brand_list_filter
    //     .map((item) => {
    //       return `bQ=${item}`;
    //     })
    //     .toString()
    //     .replaceAll(",", "&")} `
    // );
  };
  const testHandler = () => {
    const url = `?${sort ? `sort=${sort}&` : ""}${
      !!searchQuery ? `searchQuery=${searchQuery}` : ""
    }${!!searchQuery && !!bQ ? "&" : ""}${brand_list_filter
      .map((item) => {
        return `bQ=${item}`;
      })
      .toString()
      .replaceAll(",", "&")}`;
    console.log(url);
  };

  const expandHandler =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div className="hidden md:block">
        {/* <button onClick={testHandler}>test</button> */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={expandHandler("panel1")}
          className=""
        >
          <AccordionSummary
            className=""
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography className="!text-dark_3 !font-iranyekan_bold !text-lg">
              دسته بندی ها
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-slate-100">
            <Categories
              searchQuery={searchQuery}
              sort={sort}
              mainCats={mainCats}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={expandHandler("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography
              className="!text-dark_3 !font-iranyekan_bold  !text-lg"
              fontSize={11}
            >
              برند ها
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-slate-100 flex flex-col gap-2 h-96 overflow-auto">
            {brands.map((brand) => {
              return (
                <div
                  key={brand.id}
                  className="flex justify-between items-center pb-3"
                >
                  <div className="flex items-center">
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
                    <label
                      htmlFor={brand.title_en}
                      className="font-iranyekan_bold text-dark_3 !text-lg cursor-pointer px-2"
                    >
                      {brand.title_fr}
                    </label>
                  </div>
                  <label
                    htmlFor={brand.title_en}
                    className="font-iranyekan_bold text-dark_3 !text-lg grow text-left cursor-pointer"
                  >
                    {brand.title_en}
                  </label>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={expandHandler("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography className="!text-dark_3  !text-lg !font-iranyekan_bold">
              محدوده قیمت
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-slate-100">
            <PriceRange
              bQ={bQ}
              searchQuery={searchQuery}
              sort={sort}
              maxPrice={maxPrice}
              minPrice={minPrice}
            />
          </AccordionDetails>
        </Accordion>
      </div>
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
    </>
  );
}
