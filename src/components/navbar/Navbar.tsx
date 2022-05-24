import {
  AppBar,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import calendarPng from "../../assets/calendar.png";
import userPng from "../../assets/user.png";
import myPetsPng from "../../assets/leash.png";
import groupsPng from "../../assets/veterinary.png";
import { routes } from "../../routes";
import logoPng from "../../assets/logo.png";

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
    <AppBar position="absolute">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={logoPng} height="40" alt="logo" />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-around">
              <Grid item>
                <IconButton>
                  <img src={calendarPng} height="40" alt="calendar" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={navToPets}>
                  <img src={myPetsPng} height="40" alt="pets" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={navToGroups}>
                  <img src={groupsPng} height="40" alt="groups" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton onClick={handleClick}>
                  {/* TODO: put the user's profile picture */}
                  <img src={userPng} height="40" alt="general" />
                </IconButton>
                {/* TODO: redirect to the right pages */}
                <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
                  <MenuList dense>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <FormatListBulletedIcon />
                      </ListItemIcon>
                      Today&apos;s Tasks
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      Update Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <PowerSettingsNewIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
