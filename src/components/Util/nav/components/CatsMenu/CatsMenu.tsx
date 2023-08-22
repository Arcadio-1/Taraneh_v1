"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components_shadcn/ui/navigation-menu";
import Image from "next/image";
import { MainCatsWithSpecificCats } from "@/types/type";
import Link from "next/link";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

import ToolsIcon from "@/components/Util/icons/ToolsIcon";
import DrinksIcon from "@/components/Util/icons/DrinksIcon";
interface Props {
  mainCats: MainCatsWithSpecificCats[];
}
export function CatsMenu({ mainCats }: Props) {
  return (
    <NavigationMenu dir="rtl" className="border-transparent">
      <NavigationMenuList>
        {mainCats.map((cat) => {
          return (
            <NavigationMenuItem key={cat.id}>
              <NavigationMenuTrigger className="text-xl flex items-center gap-1">
                {cat.title === "نوشیدنی ها" && (
                  <DrinksIcon classes="h-8 w-8 fill-dark_4" />
                )}
                {cat.title === "ابزار تهیه نوشیدنی" && (
                  <ToolsIcon classes="h-8 w-8 fill-dark_4" />
                )}
                {cat.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-100 rounded-xl border-transparent">
                <ul className="grid gap-3 p-4 md:w-[700px] md:grid-cols-5 md:grid-rows-2 items-stretch">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-evenly items-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/main/${cat.label}`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={100}
                          height={100}
                        />
                        <div className="mb-2 mt-4 text-lg font-iransansbold">
                          {cat.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {cat.Specific_cat.map((specific) => {
                    return (
                      <ListItem
                        className="flex flex-col h-full justify-between border rounded-xl border-opacity-20 border-g1_7 items-stretch font-iransansbol hover:border-opacity-80"
                        key={specific.id}
                        href={`/search/${specific.label}`}
                        title={specific.title}
                      >
                        <Image
                          className="mr-auto"
                          src={specific.single_image}
                          alt={specific.title}
                          width={50}
                          height={50}
                        />
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemType1 = React.ComponentPropsWithoutRef<"a">;
type ListItemType2 = Omit<ListItemType1, "href"> & { href: string };

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemType2>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-lg font-iranyekan font-medium leading-none">
              {title}
            </div>
            <div className="">{children}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
