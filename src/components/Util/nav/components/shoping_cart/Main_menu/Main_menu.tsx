"use client";
import ArrowIcon, { Arrow } from "@/components/Util/icons/ArrowIcon";
import DrinksIcon from "@/components/Util/icons/DrinksIcon";
import MenuIcon from "@/components/Util/icons/MenuIcon";
import ToolsIcon from "@/components/Util/icons/ToolsIcon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components_shadcn/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components_shadcn/ui/tabs";
import { MainCatsWithSpecificCats } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}
const Main_menu = ({ cats }: Props) => {
  return (
    <div className=" md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <MenuIcon clasess="h-12 w-12" />
          </div>
        </SheetTrigger>
        <SheetContent
          className="shadow-lg border rounded-lg flex flex-col gap-6 pt-[5rem]"
          side={"right"}
        >
          <Tabs
            className=" flex flex-row-reverse items-stretch gap-6 h-full"
            defaultValue={cats[0].label}
          >
            <TabsList className="flex flex-col justify-start gap-2 p-0 bg-slate-200 h-full">
              {cats.map((mainCat) => {
                return (
                  <TabsTrigger
                    // place="mainMenu"
                    key={mainCat.id}
                    value={mainCat.id}
                    className=" pt-6 border-transparent w-full"
                  >
                    <div className="flex flex-col items-center gap-3">
                      {mainCat.title === "نوشیدنی ها" && (
                        <DrinksIcon classes="h-8 w-8 fill-dark_4" />
                      )}
                      {mainCat.title === "ابزار تهیه نوشیدنی" && (
                        <ToolsIcon classes="h-8 w-8 fill-dark_4" />
                      )}
                      <span className="text-lg font-iranyekan_bold">
                        {mainCat.title}
                      </span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {cats.map((mainCat) => {
              return (
                <TabsContent
                  className="w-full"
                  key={mainCat.id}
                  value={mainCat.id}
                >
                  <div dir="rtl" className="grid grid-cols-3 gap-6">
                    {mainCat.Specific_cat.map((specific) => {
                      return (
                        <SheetClose key={specific.id} asChild>
                          <Link href={`/search/${specific.label}`}>
                            <div className="flex flex-col gap-2 items-center justify-center">
                              <div className="bg-slate-200 w-24 h-24 md:w28 md:h-28 flex justify-center items-center rounded-full">
                                <Image
                                  alt={specific.title}
                                  width={40}
                                  height={40}
                                  src={specific.single_image}
                                />
                              </div>
                              <div className="flex justify-center items-center text-sm">
                                <span className="text-center font-iranyekan_bold text-dark_3 mb-auto">
                                  {specific.title}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                  <SheetClose asChild>
                    <Link
                      className="flex items-center justify-end gap-2 w-full ml-auto text-right py-2 "
                      href={`/search/${mainCat.label}`}
                    >
                      <ArrowIcon
                        classes="h-5 w-5 fill-g1_7"
                        direction={Arrow.left}
                      />
                      <div className="text-g1_7 text-lg">
                        <span>مشاهده همه</span>
                        <span> {mainCat.title} </span>
                      </div>
                    </Link>
                  </SheetClose>
                </TabsContent>
              );
            })}
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};

{
}
export default Main_menu;
