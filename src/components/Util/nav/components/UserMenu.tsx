"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components_shadcn/ui/dropdown-menu";
import { Session } from "next-auth";
import Image from "next/image";
import DefaultProfileImage from "@/assets/images/util/user_profile_image.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

interface Props {
  callbackPath: string;
  session: Session | null;
}

export function UserMenu({ callbackPath, session }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    console.log("status", status);
    console.log("data", data);
  }, [status, data]);

  useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <div>
      {!!user ? (
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar className="h-12 w-12" />
            </IconButton>
          </Box>
          <Menu
            dir="rtl"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiMenuItem-root": {
                  display: "flex",
                  // justifyContent: "space-between",
                },
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: 1,
                  mr: -0.5,
                  p: 0,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 40,
                  width: 10,
                  height: 10,
                  // p: 0,
                  // m: 0,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link href={"/profile"}>
              <MenuItem
                className="font-iransansnum text-lg"
                onClick={handleClose}
              >
                <Avatar /> {user.phone}
                <svg className="w-5 h-5 mr-5 " viewBox="0 0 512 512">
                  <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
                </svg>
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem
              className="font-iranyekan_bold text-base"
              onClick={() => {
                signOut();
                handleClose();
              }}
            >
              {/* <ListItemIcon > */}
              <Logout className="ml-3" fontSize="medium" />
              {/* </ListItemIcon> */}
              خروج از حساب کاربری
            </MenuItem>
          </Menu>
        </React.Fragment>
      ) : (
        // <DropdownMenu dir="rtl">
        //   <DropdownMenuTrigger asChild>
        //     <Image
        //       className="w-12 h-12 p-1 border border-dark_3 border-opacity-80 rounded-full"
        //       src={user.image || DefaultProfileImage}
        //       width={50}
        //       height={50}
        //       alt="منو"
        //       title="منو کاربری"
        //     />
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent className="w-56 bg-slate-100">
        //     <DropdownMenuSeparator />
        //     <DropdownMenuGroup>
        //       <DropdownMenuItem>
        //         <span>{user.phone}</span>
        //         <DropdownMenuShortcut>
        //           <svg className="w-4 h-4" viewBox="0 0 96 96">
        //             <path d="M43.7578,61.7578a5.9994,5.9994,0,1,0,8.4844,8.4844l18-18a5.9979,5.9979,0,0,0,0-8.4844l-18-18a5.9994,5.9994,0,0,0-8.4844,8.4844L51.5156,42H6A6,6,0,0,0,6,54H51.5156Z" />
        //             <path d="M90,0H30a5.9966,5.9966,0,0,0-6,6V18a6,6,0,0,0,12,0V12H84V84H36V78a6,6,0,0,0-12,0V90a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V6A5.9966,5.9966,0,0,0,90,0Z" />
        //           </svg>
        //         </DropdownMenuShortcut>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem>
        //         Billing
        //         <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        //       </DropdownMenuItem>
        //       <DropdownMenuItem>
        //         Settings
        //         <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        //       </DropdownMenuItem>
        //     </DropdownMenuGroup>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuGroup>
        //       <DropdownMenuItem>Team</DropdownMenuItem>
        //       <DropdownMenuSub>
        //         <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
        //         <DropdownMenuPortal>
        //           <DropdownMenuSubContent>
        //             <DropdownMenuItem>Email</DropdownMenuItem>
        //             <DropdownMenuItem>Message</DropdownMenuItem>
        //             <DropdownMenuSeparator />
        //             <DropdownMenuItem>More...</DropdownMenuItem>
        //           </DropdownMenuSubContent>
        //         </DropdownMenuPortal>
        //       </DropdownMenuSub>
        //       <DropdownMenuItem>
        //         New Team
        //         <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        //       </DropdownMenuItem>
        //     </DropdownMenuGroup>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem>GitHub</DropdownMenuItem>
        //     <DropdownMenuItem>Support</DropdownMenuItem>
        //     <DropdownMenuItem disabled>API</DropdownMenuItem>
        //     <DropdownMenuSeparator />
        //     <DropdownMenuItem
        //       onClick={() => {
        //         signOut();
        //       }}
        //     >
        //       Log out
        //       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
        <Link
          href={`/users/login/?callback=${callbackPath}`}
          className="flex items-center gap-1 border-2 px-6 py-2 rounded-xl cursor-pointer"
        >
          <svg
            className="h-10 w-10 stroke-dark_3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
            <path d="M20 12h-13l3 -3m0 6l-3 -3" />
          </svg>
          <button>
            <span className="text-lg font-iransansbold text-dark_3">ورود</span>
            <span className="text-lg font-iransansbold text-dark_3"> | </span>
            <span className="text-lg font-iransansbold text-dark_3">
              ثبت نام
            </span>
          </button>
        </Link>
      )}
    </div>
  );
}
