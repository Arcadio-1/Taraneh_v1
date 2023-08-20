"use client";
import React, { useEffect, useState } from "react";
import MenuIcon from "../../../icons/MenuIcon";
import { MegaMenu } from "./components/MegaMenu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components_shadcn/ui/navigation-menu";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components_shadcn/ui/menubar";
import DrinksIcon from "@/components/Util/icons/DrinksIcon";
import ToolsIcon from "@/components/Util/icons/ToolsIcon";
import { MainCatsWithSpecificCats } from "@/types/type";

interface Props {
  cats: MainCatsWithSpecificCats[];
}
const CatsMenu = ({ cats }: Props) => {
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, [mount]);
  return (
    <div
      className="flex items-center justify-center gap-1 "
      onMouseOver={() => console.log("test")}
    >
      {mount && (
        <Menubar className="border-transparent">
          <MenubarMenu>
            <MenubarTrigger className="">
              <MenuIcon clasees="h-[2rem] w-[2rem] hidden md:inline" />
              <span className="font-iranyekan_bold text-xl">
                دسته بندی کالا ها
              </span>
            </MenubarTrigger>
            <MenubarContent className="bg-slate-100">
              <div className="bg-red-100 h-[40rem] ">
                {/* <div className="bg-red-200 w-full grow-0 shrink"> */}
                {/* <MenubarSeparator /> */}
                <MenubarSub>
                  <MenubarSubTrigger>
                    نوشیدنی
                    <MenubarShortcut>
                      <DrinksIcon classes="h-7 w-7" />
                    </MenubarShortcut>
                  </MenubarSubTrigger>
                  <MenubarSubContent className="bg-slate-100 h-[40rem] w-[60rem]">
                    <MegaMenu />
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                  <MenubarSubTrigger>
                    ابزار تهیه نوشیدنی
                    <MenubarShortcut>
                      <ToolsIcon classes="h-7 w-7" />
                    </MenubarShortcut>
                  </MenubarSubTrigger>
                  <MenubarSubContent className="bg-slate-100">
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                {/* </div> */}
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </div>
  );
};

export default CatsMenu;

// export function MenubarDemo() {
//   return (
//     <Menubar>
//       <MenubarMenu>
//         <MenubarTrigger>File</MenubarTrigger>
//         <MenubarContent>
//           <MenubarItem>
//             New Tab <MenubarShortcut>⌘T</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem>
//             New Window <MenubarShortcut>⌘N</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem disabled>New Incognito Window</MenubarItem>
//           <MenubarSeparator />
//           <MenubarSub>
//             <MenubarSubTrigger>Share</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem>Email link</MenubarItem>
//               <MenubarItem>Messages</MenubarItem>
//               <MenubarItem>Notes</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//           <MenubarSeparator />
//           <MenubarItem>
//             Print... <MenubarShortcut>⌘P</MenubarShortcut>
//           </MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>Edit</MenubarTrigger>
//         <MenubarContent>
//           <MenubarItem>
//             Undo <MenubarShortcut>⌘Z</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem>
//             Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
//           </MenubarItem>
//           <MenubarSeparator />
//           <MenubarSub>
//             <MenubarSubTrigger>Find</MenubarSubTrigger>
//             <MenubarSubContent>
//               <MenubarItem>Search the web</MenubarItem>
//               <MenubarSeparator />
//               <MenubarItem>Find...</MenubarItem>
//               <MenubarItem>Find Next</MenubarItem>
//               <MenubarItem>Find Previous</MenubarItem>
//             </MenubarSubContent>
//           </MenubarSub>
//           <MenubarSeparator />
//           <MenubarItem>Cut</MenubarItem>
//           <MenubarItem>Copy</MenubarItem>
//           <MenubarItem>Paste</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>View</MenubarTrigger>
//         <MenubarContent>
//           <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
//           <MenubarCheckboxItem checked>
//             Always Show Full URLs
//           </MenubarCheckboxItem>
//           <MenubarSeparator />
//           <MenubarItem inset>
//             Reload <MenubarShortcut>⌘R</MenubarShortcut>
//           </MenubarItem>
//           <MenubarItem disabled inset>
//             Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
//           </MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Toggle Fullscreen</MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Hide Sidebar</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//       <MenubarMenu>
//         <MenubarTrigger>Profiles</MenubarTrigger>
//         <MenubarContent>
//           <MenubarRadioGroup value="benoit">
//             <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
//             <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
//             <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
//           </MenubarRadioGroup>
//           <MenubarSeparator />
//           <MenubarItem inset>Edit...</MenubarItem>
//           <MenubarSeparator />
//           <MenubarItem inset>Add Profile...</MenubarItem>
//         </MenubarContent>
//       </MenubarMenu>
//     </Menubar>
//   )
// }
