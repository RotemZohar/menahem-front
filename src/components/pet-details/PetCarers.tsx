import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Member } from "../../types/pet";
import AddUsers from "../add-users/AddUsers";
import { User } from "../../types/user";

interface PetCarersProps {
  carers: Member[];
  onDeleteUser: (userId: string) => void;
  onAddUser: (userId: User) => void;
}

const PetCarers: React.FC<PetCarersProps> = ({
  carers,
  onDeleteUser,
  onAddUser,
}) => {
  const [addUsers, setAddUsers] = useState(false);

  if (addUsers) {
    return (
      <div style={{ position: "relative" }}>
        <IconButton
          onClick={() => setAddUsers(false)}
          style={{ position: "absolute", left: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <div>
          <AddUsers
            selectedUsers={carers}
            onAddUser={onAddUser}
            onDeleteUser={onDeleteUser}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <IconButton onClick={() => setAddUsers((prev) => !prev)}>
        <AddIcon />
      </IconButton>
      <Paper variant="outlined">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Delete</TableCell>
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
                    <IconButton
                      id={row._id}
                      onClick={() => onDeleteUser(row._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
export default PetCarers;
