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
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import moment from "moment";
import { Card, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Treatment } from "../../types/pet";
import TabPanel from "../tab-panel/TabPanel";
import { useHideNavbar } from "../../hooks/use-hide-navbar";
import { User } from "../../types/user";
import Loader from "../loader/Loader";
import medicalLogo from "../../assets/med-history.png";
import carersLogo from "../../assets/pet-carer.png";

const PetMedicalPageGuests = () => {
  const [value, setValue] = useState(0);
  const { petId } = useParams();
  const options = {};
  const {
    data: petMedical = [],
    loading,
    error,
  } = useFetch(`/auth/${petId}/medical/guests`, options, [petId]);

  useHideNavbar();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log(petMedical);
  }, [petMedical]);

  return (
    <Box>
      {error && error.message}
      {loading && <Loader />}
      {petMedical && petMedical.medical && (
        <Grid container justifyContent="center">
          <Card
            sx={{
              width: 600,
              m: 3,
            }}
          >
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab
                label="Medical History"
                icon={<MedicalServicesIcon />}
                iconPosition="start"
              />
              <Tab
                label="Owners"
                icon={<ContactMailIcon />}
                iconPosition="start"
              />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid item xs={12} m={2}>
                <img src={medicalLogo} alt="medical history" width="500" />
              </Grid>
              <TableContainer>
                <Paper variant="outlined">
                  <Table aria-label="simple table">
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.treatment}</TableCell>
                          <TableCell align="center">
                            {moment(row.date).format("DD-MM-YYYY")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={12} m={2}>
                <img src={carersLogo} alt="pet-carers" width="500" />
              </Grid>
              <TableContainer>
                <Paper variant="outlined">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {petMedical.members.map((row: User) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </TableContainer>
            </TabPanel>
          </Card>
        </Grid>
      )}
    </Box>
  );
};
export default PetMedicalPageGuests;
