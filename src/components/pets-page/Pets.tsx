import * as React from "react";
import {
  Avatar,
  CircularProgress,
  Fab,
  Grid,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../types/pet";
import { RootState } from "../../redux/store";
import { routes } from "../../routes";
import petsLogo from "../../assets/mypets.png";
import addIcon from "../../assets/add-pet.png";
import Loader from "../loader/Loader";

const PetsPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const options = {};
  const { data: pets = [], loading } = useFetch(
    `/user/${userId}/pets`,
    options,
    [userId]
  );

  const navToPet = (pet: Pet) => {
    navigate(`/pet/${pet._id}`);
  };

  const addPet = () => {
    navigate(routes.newpet);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} mt={2}>
        <img src={petsLogo} alt="my pets" width="300" />
      </Grid>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 550,
          maxHeight: 400,
          bgcolor: "background.paper",
          overflow: "auto",
          borderRadius: 5,
          elevation: 3,
        }}
      >
        {pets.map((pet: Pet) => (
          <Grid key={pet._id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                sx={{ height: 100 }}
                alignItems="center"
                onClick={() => navToPet(pet)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={pet.name}
                    src={pet.imgUrl}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText primary={pet.name} secondary={pet.breed} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Grid>
        ))}
      </Paper>
      <Grid item xs={12} m={2}>
        <Tooltip arrow title="Add Pet">
          <Fab onClick={addPet} color="primary" aria-label="add">
            <img src={addIcon} alt="Add Pet" width="28" />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
export default PetsPage;
