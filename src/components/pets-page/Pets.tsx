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
  TablePagination,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  const navToEdit = (pet: Pet) => {
    navigate(`/pet/${pet._id}/edit`);
  };

  if (loading) {
    return <Loader />;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} mt={2}>
        <img src={petsLogo} alt="my pets" width="300" />
      </Grid>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          borderRadius: 5,
          elevation: 3,
        }}
      >
        {pets
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((pet: Pet) => (
            <Grid>
              <ListItem ContainerComponent="div" disablePadding>
                <ListItemButton
                  sx={{ height: 80, mr: 5 }}
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
                <ListItemSecondaryAction>
                  <IconButton onClick={() => navToEdit(pet)}>
                    <Tooltip title="Edit">
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                  <IconButton edge="end">
                    <Tooltip title="Delete">
                      <DeleteIcon />
                    </Tooltip>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </Grid>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={pets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
