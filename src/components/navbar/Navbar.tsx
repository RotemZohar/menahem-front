import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <BottomNavigation>
      <BottomNavigationAction value="my-pets" />
      <BottomNavigationAction value="my-tasks" />
      <BottomNavigationAction value="my-pets" />
      <BottomNavigationAction value="my-pets" />
    </BottomNavigation>
  );
}

export default Navbar;
