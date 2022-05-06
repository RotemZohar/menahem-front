import { CalendarViewMonth, Favorite } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarPng from "../../assets/calendar.png";
import { setShowNavbar } from "../../redux/slices/navbarSlice";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container justifyContent="space-around">
      <Grid item>
        <Button onClick={handleClick}>
          <img src={calendarPng} height="50" width="50" alt="calendar" />
        </Button>
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Grid>
      <Grid item>
        <Button>
          <img src={calendarPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <img src={calendarPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Navbar;
