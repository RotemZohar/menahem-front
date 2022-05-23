import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useFetch from "use-http";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { Pet } from "../../types/pet";
import { RootState } from "../../redux/store";

const PetsPage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const [pets, setPets] = useState<Pet[]>([]);
  const { get } = useFetch(`/user/${userId}`);

  useEffect(() => {
    get(`/pets`)
      .then((data) => {
        setPets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navToPet = (pet: Pet) => {
    console.log("Navigating to pet");
  };

  const addPet = () => {
    console.log("add pet");
  };

  const petsCards = useMemo(
    () =>
      pets.map((pet) => (
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
      )),
    [pets]
  );

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        My pets
      </Typography>
      {petsCards}
      <Fab onClick={addPet} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
export default PetsPage;
