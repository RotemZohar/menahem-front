import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import QrIcon from "@mui/icons-material/QrCode";
import moment from "moment";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";

import ReactDOM from "react-dom";
import QRcode from "qrcode.react";
import { Treatment } from "../../types/pet";

const PetMedical = (props: { medical: Treatment[] }) => {
  const navigate = useNavigate();
  const { medical } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addTreatmentOpen, setTreatmentOpen] = React.useState(false);
  const [showQrOpen, setShowQrOpen] = React.useState(false);
  const [treatment, setTreatment] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const [medicalTreatments, setMedicalTreatments] = useState<Treatment[]>([]);
  const { petId } = useParams();
  const [qr] = useState(`${petId}/medical/guests`);
  const { post } = useFetch("/pet");

  useEffect(() => {
    setMedicalTreatments(medical);
  }, [medical]);

  const handleAddTreatmentOpen = () => {
    setTreatmentOpen(true);
  };

  const handleAddTreatmentClose = () => {
    setTreatmentOpen(false);
  };

  const handleShowQrOpen = () => {
    setShowQrOpen(true);
  };

  const handleShowQrClose = () => {
    setShowQrOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const navPetMedicalPage = () => {
    navigate(`../${qr}`, { replace: true });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!medical) {
    return (
      <div>
        <Typography sx={{ fontSize: "26px" }}>
          No tasks have been asigned yet
        </Typography>
      </div>
    );
  }

  const addTreatment = async () => {
    setTreatmentOpen(false);

    const date = moment(treatmentDate, "DD-MM-YYYY").toDate();

    const newTreatment = await post(`/${petId}/add-treatment`, {
      treatment,
      date,
    }).then((newTreatmentResponse) => {
      setMedicalTreatments((prevState) => [
        ...prevState,
        { _id: newTreatmentResponse, treatment, date },
      ]);
    });
  };

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
              {medicalTreatments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.treatment}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.date).format("DD-MM-YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={medical.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Fab onClick={handleAddTreatmentOpen} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Fab onClick={handleShowQrOpen} color="primary" aria-label="add">
        <QrIcon />
      </Fab>

      <Dialog open={showQrOpen} onClose={handleShowQrClose}>
        <DialogTitle>Pet medical page for guests</DialogTitle>
        <DialogContent>
          <QRcode
            id="petMedicalQrGuests"
            value={`${window.location.origin}/${qr}`}
            size={260}
            includeMargin
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={navPetMedicalPage}>GO</Button>
          <Button onClick={handleShowQrClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addTreatmentOpen} onClose={handleAddTreatmentClose}>
        <DialogTitle>Add treatment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Treatment"
            type="string"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTreatment(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="TreatmentDate"
            type="date"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTreatmentDate(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTreatmentClose}>Cancel</Button>
          <Button onClick={addTreatment}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PetMedical;
