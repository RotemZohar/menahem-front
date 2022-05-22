import { Button, Grid, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import calendarPng from "../../assets/calendar.png";
import petPng from "../../assets/pawprint.png";
import myPetsPng from "../../assets/leash.png";
import groupsPng from "../../assets/veterinary.png";
import { routes } from "../../routes";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navToGroups = () => {
    navigate(routes.groups);
  };

  const navToPets = () => {
    navigate(routes.pets);
  };

  return (
    <Grid container justifyContent="space-around">
      <Grid item>
        <Button onClick={handleClick}>
          {/* TODO: put the user's profile picture */}
          <img src={petPng} height="50" width="50" alt="calendar" />
        </Button>
        {/* TODO: redirect to the right pages */}
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <MenuItem onClick={handleClose}>Today&apos;s Tasks</MenuItem>
          <MenuItem onClick={handleClose}>Update Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Grid>
      <Grid item>
        <Button onClick={navToPets}>
          <img src={myPetsPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <img src={calendarPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={navToGroups}>
          <img src={groupsPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Navbar;
