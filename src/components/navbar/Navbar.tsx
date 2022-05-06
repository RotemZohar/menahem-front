import { Favorite } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Icon } from "@mui/material";
import React from "react";
import calendarPng from "../../assets/calendar.png";

function Navbar() {
  return (
    <BottomNavigation>
      <BottomNavigationAction
        value="my-pets"
        label="pets"
        icon={
          <Icon>
            <img alt="" src={calendarPng} />
          </Icon>
        }
      />
      <BottomNavigationAction value="my-tasks" />
      <BottomNavigationAction value="my-pets" />
      <BottomNavigationAction value="my-pets" />
    </BottomNavigation>
  );
}

export default Navbar;
