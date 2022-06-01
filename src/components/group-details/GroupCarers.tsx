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
import AddUsers from "../add-users/AddUsers";
import { User } from "../../types/user";

const GroupCarers = (props: { carers: any[] }) => {
  const { carers } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState<User[]>([]);
  const [addUserOpen, setAddUserOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddUserOpen = () => {
    setAddUserOpen(true);
  };

  const handleAddUserClose = () => {
    setAddUserOpen(false);
  };

  const addMembers = async () => {
    // todo: put members in group

    setAddUserOpen(false);
  };

  if (!carers) {
    return (
      <Box>
        <Typography sx={{ fontSize: "26px" }}>
          This group has no carers!
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
                <TableCell align="center">Email</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={carers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container justifyContent="center" mt={3}>
        <Tooltip arrow title="Add Member">
          <Fab onClick={handleAddUserOpen} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Tooltip>
      </Grid>

      <Dialog
        open={addUserOpen}
        onClose={handleAddUserClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle style={{ fontWeight: "bold" }}>Add Members</DialogTitle>
        <Divider />
        <DialogContent>
          <AddUsers
            selectedUsers={users}
            onAddUser={(newUser) => {
              setUsers((prevUsers) => {
                if (
                  prevUsers.findIndex((user) => user._id === newUser._id) === -1
                ) {
                  return [...prevUsers, newUser];
                }
                return prevUsers;
              });
            }}
            onDeleteUser={(userId) => {
              setUsers((prev) => {
                const remove = prev.findIndex((user) => user._id === userId);
                return prev.splice(remove);
              });
            }}
          />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleAddUserClose}>Cancel</Button>
          <Button variant="contained" onClick={addMembers}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupCarers;
