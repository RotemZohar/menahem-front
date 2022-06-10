import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";
import TabPanel from "../tab-panel/TabPanel";
import GroupCarers from "./GroupCarers";
import GroupPets from "./GroupPets";
import Loader from "../loader/Loader";
import { User } from "../../types/user";
import { Pet } from "../../types/pet";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [carers, setCarers] = useState<User[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const { post, del, get, response } = useFetch("/group");
  const {
    data: details,
    loading,
    error,
  } = useFetch(`/group/${groupId}`, {}, [groupId]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (details) {
      setCarers(details.members);
      setPets(details.pets);
    }
  }, [details]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navToEdit = () => {
    navigate(`/group/${groupId}/edit`);
  };

  const deleteUserFromGroup = async (userId: string) => {
    const data = await del(`/${groupId}/user/${userId}`);
    if (data === "Deleted") {
      details.members = details.members.filter(
        (member: User) => member._id !== userId
      );

      details.members = [...details.members];
      setCarers(details.members);
    }
  };

  const addUserToGroup = async (users: User[]) => {
    if (users.length === 0) {
      alert("Please add some members!");
    } else {
      const data = await post(`/${groupId}/Users`, {
        usersIds: users,
      });

      users.forEach((user) => {
        details.members.push(user);
      });

      details.members = [...details.members];
      setCarers(details.members);
    }
  };

  const deletePetFromGroup = async (petId: string) => {
    const data = await del(`/${groupId}/pet/${petId}`);
    if (data === "Deleted") {
      details.pets = details.pets.filter((pet: Pet) => pet._id !== petId);
      details.members = [...details.members];
      setPets(details.pets);
    }
  };

  const addPetToGroup = async (petsToAdd: Pet[]) => {
    if (petsToAdd.length === 0) {
      alert("Please add some pets!");
    } else {
      const data = await post(`/${groupId}/Pets`, {
        petsIds: petsToAdd,
      });

      petsToAdd.forEach((pet) => {
        details.pets.push(pet);
      });

      details.pets = [...details.pets];
      setPets(details.pets);
    }
  };

  return (
    <Box>
      {error && error.message}
      {loading && <Loader />}
      {details && (
        <Grid container justifyContent="center">
          <Card
            sx={{
              width: 600,
              minHeight: 400,
              m: 3,
            }}
          >
            <CardHeader
              title={
                <Grid container m={1}>
                  <Typography
                    variant="h4"
                    align="left"
                    sx={{ fontWeight: "bold" }}
                  >
                    {details.name}
                  </Typography>
                </Grid>
              }
              subheader={
                <Grid container m={1}>
                  <Typography align="left">{details.description}</Typography>
                </Grid>
              }
              action={
                <Grid container>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                </Grid>
              }
            />
            <Menu open={openMenu} onClose={handleMenuClose} anchorEl={anchorEl}>
              <MenuList dense>
                <MenuItem
                  onClick={() => {
                    navToEdit();
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit Details</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText>Leave Group</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
            <Divider />
            <CardContent>
              <Grid container justifyContent="center">
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                  <Tab label="Pets" />
                  <Tab label="Carers" />
                </Tabs>
              </Grid>
              <TabPanel value={value} index={0}>
                <GroupPets
                  pets={pets}
                  deletePetFromGroup={deletePetFromGroup}
                  addPetToGroup={addPetToGroup}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GroupCarers
                  carers={carers}
                  deleteUserFromGroup={deleteUserFromGroup}
                  addUserToGroup={addUserToGroup}
                />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Box>
  );
};

export default GroupDetails;
