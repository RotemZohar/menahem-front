import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useFetch from "use-http";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Treatment } from "../../types/pet";

const PetMedicalPageGuests = () => {
  const { petId } = useParams();
  const options = {};
  const {
    data: petMedical = [],
    loading,
    error,
  } = useFetch(`/auth/${petId}/medical/guests`, options, [petId]);

  return (
    <Box>
      {error && error.message}
      {loading && "Loading..."}
      {petMedical && petMedical.medical && (
        <Box>
          <Typography variant="h2" gutterBottom>
            Pet medical history
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Treatment</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {petMedical.medical.map((row: Treatment) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.treatment}</TableCell>
                    <TableCell align="center">
                      {moment(row.date).format("DD-MM-YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
export default PetMedicalPageGuests;
