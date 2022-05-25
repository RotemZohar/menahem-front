import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Group } from "../../types/pet";

const PetGroups = (props: { groups: Group[] }) => {
  const { groups } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!groups) {
    return (
      <div>
        <Typography sx={{ fontSize: "26px" }}>
          The pet has no groups!
        </Typography>
      </div>
    );
  }

  return (
    <Box>
      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Treatments</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((group) => (
                  <TableRow
                    key={group._id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {group.name}
                    </TableCell>
                    <TableCell align="center">{group.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={groups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PetGroups;
