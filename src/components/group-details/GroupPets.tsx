import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "use-http";
import { useParams } from "react-router-dom";
import { Pet } from "../../types/pet";
import MultipleSelect from "../multiple-select/MultipleSelect";

const GroupPets = (props: { pets: Pet[] }) => {
  const { post } = useFetch("/group");
  const { pets } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addPetOpen, setAddPetOpen] = React.useState(false);
  const { data: petsList, loading } = useFetch("/user/pets", {}, []);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const { groupId } = useParams();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddPetOpen = () => {
    setAddPetOpen(true);
  };

  const handleAddPetClose = () => {
    setAddPetOpen(false);
  };

  const addPets = async () => {
    if (selectedPets.length === 0) {
      alert("Please add some pets!");
    } else {
      post(`/${groupId}/Pets`, {
        petsIds: selectedPets,
      })
        .then(() => {
          // TODO: add pet to table
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong with adding pets");
        });
    }

    setSelectedPets([]);
    setAddPetOpen(false);
  };

  if (!pets) {
    return (
      <Box>
        <Typography sx={{ fontSize: "26px" }}>
          This group has no pets!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Paper variant="outlined">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Species</TableCell>
                <TableCell align="center">Breed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pet) => (
                  <TableRow
                    key={pet._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{pet.name}</TableCell>
                    <TableCell align="center">{pet.species}</TableCell>
                    <TableCell align="center">{pet.breed}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
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
      <Grid container justifyContent="center" mt={3}>
        <Tooltip arrow title="Add Pet">
          <Fab onClick={handleAddPetOpen} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>

      <Dialog
        open={addPetOpen}
        onClose={handleAddPetClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle style={{ fontWeight: "bold" }}>Add Pets</DialogTitle>
        <Divider />
        <DialogContent>
          {petsList && (
            <MultipleSelect
              selectOptions={petsList}
              selectedArr={selectedPets}
              setSelectedArr={setSelectedPets}
              label="Select Pets*"
            />
          )}
        </DialogContent>
        <Divider />

        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleAddPetClose}>Cancel</Button>
          <Button variant="contained" onClick={addPets}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupPets;
