"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { Role } from "@prisma/client";
import ArrowIcon, { Arrow } from "../../icons/ArrowIcon";
import UserDashboardIcon from "../../icons/UserDashboardIcon";
import AdminDashboardIcon from "../../icons/AdminDashboardIcon";

interface Props {
  session: Session;
}

export function UserMenuMui({ session }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const user = session;
  return (
    <div>
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
          style={{ left: "60px" }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 0.3,
              left: 50,
              minWidth: 140,
              "& .MuiMenuItem-root": {
                display: "flex",
                alignItems: "stretch",
                padding: "7px 0px",
                height: "100%",
              },
              "& .MuiDivider-root": {
                marginTop: 0.5,
                marginBottom: 0.5,
              },
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: 1,
                mr: -0.5,
                p: 0,
                left: 0,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 2,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Link
              className="flex justify-between items-center w-full px-2"
              href={"/profile"}
            >
              <div className="flex gap-2 items-start">
                <UserDashboardIcon classess="h-6 w-6 fill-dark_4" />
                {!session.user.name && !session.user.family && (
                  <span className="font-iransansnum text-xl">
                    {session.user.phone}
                  </span>
                )}
                {session.user.name && session.user.family && (
                  <span className=" text-md text-dark_4 font-iranyekan_bold">
                    {session.user.name} {session.user.family}
                  </span>
                )}
              </div>
              <ArrowIcon classes="h-4 w-4 fill-dark_4" direction={Arrow.left} />
            </Link>
          </MenuItem>
          <Divider />
          {session.user.role === Role.ADMIN && (
            <MenuItem onClick={handleClose}>
              <Link
                className="flex justify-between items-center w-full px-2"
                href={"/dashboard"}
              >
                <div className="flex gap-2 items-start">
                  <AdminDashboardIcon className="h-6 w-6 fill-dark_4" />
                  <span className="text-md text-dark_4 font-iranyekan_bold">
                    پنل مدیریت
                  </span>
                </div>
                <ArrowIcon
                  classes="h-4 w-4 fill-dark_4"
                  direction={Arrow.left}
                />
              </Link>
              <Divider className="my-2" />
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              signOut();
              handleClose();
            }}
          >
            <div className="flex justify-between items-center w-full px-2">
              <div className="flex gap-2 items-start">
                <Logout className=" h-6 w-6 fill-dark_4" fontSize="medium" />
                <span className="text-md text-dark_4 font-iranyekan_bold">
                  خروج از حساب کاربری
                </span>
              </div>
            </div>
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  );
}
