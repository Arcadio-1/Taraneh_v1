import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/Util/shadcn/ui/navigation-menu";
import Image from "next/image";
import { MainCatsWithSpecificCats } from "@/types_validation/type";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";

const getCats = React.cache(async () => {
  try {
    const cats: MainCatsWithSpecificCats[] = await prisma.main_cat.findMany({
      include: { Specific_cat: true },
    });
    if (!cats) {
      return notFound();
    }
    return cats;
  } catch (error) {
    return notFound();
  }
});

export const CatsMenu = async () => {
  const cats = await getCats();
  return (
    <NavigationMenu dir="rtl" className="border-transparent">
      <NavigationMenuList>
        {cats.map((cat) => {
          return (
            <NavigationMenuItem key={cat.id}>
              <NavigationMenuTrigger className="flex items-center gap-1 text-xl">
                <Image src={cat.icon} width={20} height={20} alt={cat.title} />
                {cat.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-xl border-transparent bg-slate-100">
                <ul className="grid items-stretch gap-3 p-4 md:w-[700px] md:grid-cols-5 md:grid-rows-2">
                  <li className="row-span-2">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col items-center justify-evenly rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={`/${cat.label}`}
                      >
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={100}
                          height={100}
                        />
                        <div className="mb-2 mt-4 font-iransansbold text-lg">
                          {cat.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {cat.Specific_cat.map((specific) => {
                    return (
                      <ListItem
                        className="font-iransansbol flex h-full flex-col items-stretch justify-between rounded-xl border border-g1_7 border-opacity-20 hover:border-opacity-80"
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
};

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
              className,
            )}
            {...props}
          >
            <div className="font-iranyekan text-lg font-medium leading-none">
              {title}
            </div>
            <div className="">{children}</div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
