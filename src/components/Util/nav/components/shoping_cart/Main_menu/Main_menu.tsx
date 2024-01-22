"use client";
import AllIcon from "@/components/Util/icons/AllIcon";
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
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  cats: MainCatsWithSpecificCats[];
}

enum SelectedTab {
  Drinks = "drinks",
  Tools = "tools",
}
const Main_menu = ({ cats }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    SelectedTab.Tools,
  );
  return (
    <div className=" md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          onClick={() => {
            setSelectedTab(SelectedTab.Tools);
          }}
          asChild
        >
          <div>
            <MenuIcon clasess="h-12 w-12" />
          </div>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-6 rounded-lg border pt-[5rem] shadow-lg"
          side={"right"}
        >
          <Tabs
            className=" flex h-full flex-row-reverse items-stretch gap-6"
            defaultValue={cats[0].label}
          >
            <TabsList className="flex h-full flex-col justify-start gap-2 bg-slate-200 p-0">
              {cats.map((mainCat) => {
                return (
                  <TabsTrigger
                    key={mainCat.id}
                    value={mainCat.id}
                    className={`w-full border-b-[3px] border-transparent !bg-transparent pt-6 duration-0 ${
                      selectedTab === mainCat.label ? "!bg-white" : ""
                    }`}
                    onClick={() => {
                      if (mainCat.label === "tools") {
                        setSelectedTab(SelectedTab.Tools);
                      }
                      if (mainCat.label === "drinks") {
                        setSelectedTab(SelectedTab.Drinks);
                      }
                    }}
                  >
                    <div className="flex flex-col items-center gap-3">
                      {mainCat.title === "نوشیدنی ها" && (
                        <DrinksIcon classes="h-8 w-8 fill-dark_4" />
                      )}
                      {mainCat.title === "ابزار تهیه نوشیدنی" && (
                        <ToolsIcon classes="h-8 w-8 fill-dark_4" />
                      )}
                      <span className="font-iranyekan_bold text-xl">
                        {mainCat.title}
                      </span>
                    </div>
                  </TabsTrigger>
                );
              })}
              <TabsTrigger
                value={"show all"}
                className={`w-full border-b-[3px] border-transparent !bg-transparent pt-6 duration-0`}
              >
                <Link href={"/search"} onClick={() => setOpen(false)}>
                  <div className="flex flex-col items-center gap-3">
                    <AllIcon classes="h-8 w-8 fill-dark_4" />
                    <span className=" font-iranyekan_bold text-xl">
                      همه محصولات
                    </span>
                  </div>
                </Link>
              </TabsTrigger>
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
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="md:w28 flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 md:h-28">
                                <Image
                                  alt={specific.title}
                                  width={40}
                                  height={40}
                                  src={specific.single_image}
                                />
                              </div>
                              <div className="flex items-center justify-center text-sm">
                                <span className="mb-auto text-center font-iranyekan_bold text-lg text-dark_3">
                                  {specific.title}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <SheetClose asChild>
                      <Link href={`/search/${mainCat.label}`}>
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="md:w28 flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 md:h-28">
                            <AllIcon classes="h-10 w-10 fill-dark_4" />
                          </div>
                          <div className="flex items-center justify-center text-sm">
                            <span className="mb-auto text-center font-iranyekan_bold text-lg text-dark_3">
                              مشاهده همه
                            </span>
                          </div>
                        </div>
                      </Link>
                    </SheetClose>
                  </div>
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
