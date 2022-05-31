import { Box, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Member } from "../../types/pet";

interface PetCarersProps {
  carers: Member[];
  onDeleteUser: (userId: string) => void;
}

const PetCarers: React.FC<PetCarersProps> = ({ carers, onDeleteUser }) => (
  // TODO: support add users

  <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">name</TableCell>
            <TableCell align="center">email</TableCell>
            <TableCell align="center">delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carers.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">
                <IconButton id={row._id} onClick={() => onDeleteUser(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);
export default PetCarers;
