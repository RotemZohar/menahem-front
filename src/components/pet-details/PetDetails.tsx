import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Container,
  Toolbar,
  Tooltip,
} from "@mui/material";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Pet as petDetails } from "../../types/pet";
import PetTasks from "./PetTasks";
import PetCarers from "./PetCarers";
import PetMedical from "./PetMedical";
import TabPanel from "../tab-panel/TabPanel";
import PetGroups from "./petGroups";

const getAge = (birthdate: Date) => {
  const today = new Date();
  birthdate = new Date(birthdate);
  const age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    return age - 1;
  }
  return age;
};

const PetDetails = () => {
  const navigate = useNavigate();
  const { get, loading, error } = useFetch("/pet");
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState<petDetails>();
  const { petId } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    get(`/${petId}`)
      .then((pet) => {
        setDetails(pet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navToEdit = () => {
    console.log("fdfd");
    navigate(`/pet/${petId}/edit`);
  };

  return (
    <>
      {error && error.message}
      {loading && "Loading..."}
      {details && (
        <Container>
          <Box padding={3} sx={{ border: 2, borderBottom: 1 }} mt={4} mx={20}>
            <Box display="flex">
              <Avatar
                src={details.imgUrl}
                sx={{ width: 160, height: 160, border: 2 }}
              />
              <Box mx={3} mt={3}>
                <Typography variant="h2" align="left">
                  {details.name}
                </Typography>
                <Typography variant="h5" align="left">
                  {details.breed}, {getAge(details.birthdate)}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" mt={1}>
              <Typography variant="h6" align="left" ml={3}>
                height: {details.height}cm
              </Typography>
              <Typography variant="h6" align="left" ml={5}>
                weight: {details.weight}kg
              </Typography>
            </Box>
            <Tooltip title="Edit">
              <IconButton onClick={navToEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ border: 2, borderTop: 0 }} mx={20}>
            <Box sx={{ borderBottom: 1 }}>
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Medical" sx={{ borderRight: 1 }} />
                <Tab label="Carers" sx={{ borderRight: 1 }} />
                <Tab label="Tasks" sx={{ borderRight: 1 }} />
                <Tab label="Groups" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <PetMedical medical={details.medical} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PetCarers carers={details.members} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PetTasks tasks={details.tasks} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PetGroups groups={details.groups} />
            </TabPanel>
          </Box>
        </Container>
      )}
    </>
  );
};

export default PetDetails;
