import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CircularProgress } from "@mui/material";
import useFetch from "use-http";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../types/pet";
import { RootState } from "../../redux/store";
import { routes } from "../../routes";
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
    <Box>
      <Typography variant="h2" gutterBottom>
        My pets
      </Typography>
      {pets.map((pet: Pet) => (
        <CardActionArea onClick={() => navToPet(pet)}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {pet.name}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      ))}
      <Fab onClick={addPet} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
export default PetsPage;
