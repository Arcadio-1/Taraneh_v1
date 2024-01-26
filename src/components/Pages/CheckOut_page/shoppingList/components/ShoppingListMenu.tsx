"use client";
import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuDotIcon from "@/components/Util/ui/icons/MenuDotIcon";
import { Trash2Icon } from "lucide-react";
import { clear_cart } from "@/actions/clearCart";

interface Props {
  cart_id: string;
}

const ShoppingListMenu = ({ cart_id }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
    await clear_cart(cart_id);
  };
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
            aria-controls={open ? "shopping-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MenuDotIcon classess="h-6 w-6 fill-dark_5" />
          </IconButton>
        </Box>
        <Menu
          dir="rtl"
          anchorEl={anchorEl}
          id="shopping-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          style={{ left: "84px" }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.10))",
              mt: 0.3,
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
          <MenuItem
            className="flex justify-between font-iransansnum text-lg"
            onClick={handleClose}
          >
            <div className="flex w-full items-center justify-between gap-4">
              <Trash2Icon className="h-8 w-8 stroke-dark_3" />
              <span>حذف همه</span>
            </div>
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  );
};

export default ShoppingListMenu;
