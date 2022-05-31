import {
  Box,
  Divider,
  Fab,
  Grid,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { Pet } from "../../types/pet";

const GroupPets = (props: { pets: Pet[] }) => {
  const { pets } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addPetOpen, setAddPetOpen] = React.useState(false);

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
              {pets.map((pet) => (
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
    </Box>
  );
};

export default GroupPets;
