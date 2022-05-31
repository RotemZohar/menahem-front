import { Box, IconButton, Input } from "@mui/material";
import React, { useState, MouseEventHandler } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Member } from "../../types/pet";

interface PetCarersProps {
  carers: Member[];
  onEditUser: (user: Member) => void;
  onDeleteUser: (userId: string) => void;
}

const PetCarers: React.FC<PetCarersProps> = ({
  carers,
  onEditUser,
  onDeleteUser,
}) => {
  const [editModeId, setEditModeId] = useState<string | undefined>();
  const [nameEdit, setNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");

  const onEdit = (id: string) => {
    if (editModeId && editModeId === id) {
      onEditUser({
        _id: id,
        name: nameEdit,
        email: emailEdit,
      });
      setNameEdit("");
      setEmailEdit("");
      setEditModeId(undefined);
    } else if (!editModeId) {
      setEditModeId(id);
      setNameEdit(carers.find((care) => care._id === id)?.name || "");
      setEmailEdit(carers.find((care) => care._id === id)?.email || "");
    } else {
      alert("Finish your other edit first!");
    }
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">edit</TableCell>
              <TableCell align="center">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carers.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {editModeId === row._id ? (
                    <Input
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell align="center">
                  {editModeId === row._id ? (
                    <Input
                      value={emailEdit}
                      onChange={(e) => setEmailEdit(e.target.value)}
                    />
                  ) : (
                    row.email
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton id={row._id} onClick={() => onEdit(row._id)}>
                    {editModeId === row._id ? <SaveIcon /> : <ModeEditIcon />}
                  </IconButton>
                </TableCell>
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
    </Box>
  );
};

export default PetCarers;
