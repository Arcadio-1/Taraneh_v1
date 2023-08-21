"use client";

import * as React from "react";
import Link from "next/link";
import Coffee_image from "@/assets/images/menu/cofffee.png";
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
              <NavigationMenuTrigger className="text-xl">
                {cat.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-slate-100 rounded-xl border-transparent">
                <ul className="grid gap-3 p-4 md:w-[700px] md:grid-cols-5 md:grid-rows-2 items-stretch">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-start items-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={100}
                          height={100}
                        />
                        <div className="flex flex-col items-start">
                          <div className="mb-2 mt-4 text-lg font-iransansbold">
                            {cat.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {cat.title}
                          </p>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {cat.Specific_cat.map((specific) => {
                    return (
                      <ListItem
                        className="flex h-full items-start justify-start border rounded-xl border-opacity-20 border-g1_7 font-iransansbol hover:border-opacity-80"
                        key={specific.id}
                        href={`/search/${specific.label}`}
                        title={specific.title}
                      >
                        <Image
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
