import { Button, Grid, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import calendarPng from "../../assets/calendar.png";
import petPng from "../../assets/pawprint.png";
import myPetsPng from "../../assets/leash.png";
import groupsPng from "../../assets/veterinary.png";

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
    <Grid
      container
      justifyContent="space-around"
      pb={1}
      mb={1}
      style={{ backgroundColor: "#ddd" }}
    >
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
        <Button>
          <img src={myPetsPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <img src={calendarPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
      <Grid item>
        <Button>
          <img src={groupsPng} height="50" width="50" alt="calendar" />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Navbar;
