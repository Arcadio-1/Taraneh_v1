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
import { Settings2Icon } from "lucide-react";

interface Props {
  session: Session;
}

export function UserMenu({ session }: Props) {
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
              "& .MuiMenuItem-root": {
                display: "flex",
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
          <Link href={"/profile"}>
            <MenuItem
              className="font-iransansnum text-lg"
              onClick={handleClose}
            >
              <Avatar /> {session.user.phone}
              <svg className="w-5 h-5 mr-5 " viewBox="0 0 512 512">
                <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
              </svg>
            </MenuItem>
          </Link>
          <Divider />
          {session.user.role === Role.ADMIN && (
            <div>
              <Link href={"/dashboard"}>
                <MenuItem
                  className="font-iransansnum text-lg flex gap-2"
                  onClick={handleClose}
                >
                  <Settings2Icon className="stroke-gray-500" />
                  <span>پنل مدیریت</span>
                  <svg className="w-5 h-5 mr-auto " viewBox="0 0 512 512">
                    <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />
                  </svg>
                </MenuItem>
              </Link>
              <Divider />
            </div>
          )}
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
    </div>
  );
}
