import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  IconButton,
  Tab,
  Tabs,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";
import { Member, Pet as petDetails } from "../../types/pet";
import PetTasks from "./PetTasks";
import PetCarers from "./PetCarers";
import PetMedical from "./PetMedical";
import TabPanel from "../tab-panel/TabPanel";
import PetGroups from "./petGroups";
import { User } from "../../types/user";

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
  const { del, put } = useFetch("/pet");

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

  const onDeleteUser = (userId: string) => {
    del(`/${details!._id}/user/${userId}`).then((res) => {
      if (res === "OK") {
        setDetails((prev) => {
          const ind = prev!.members.findIndex((mem) => mem._id === userId);
          return { ...prev!, members: prev!.members.splice(ind) };
          // TODO: when cache need to refresh cache
        });
      }
    });
  };

  const onAddUser = (user: User) => {
    if (!details?.members.find((member) => member._id === user._id)) {
      put(`/${details!._id}/user/${user._id}`).then((res) => {
        setDetails(
          (prev) => ({ ...prev!, members: [...prev!.members, res] })
          // TODO: when cache need to refresh cache
        );
      });
    }
  };

  const navToEdit = () => {
    navigate(`/pet/${petId}/edit`);
  };

  return (
    <>
      {error && error.message}
      {loading && "Loading..."}
      {details && (
        <Grid container justifyContent="center">
          <Card sx={{ minWidth: 600, minHeight: 400, m: 3 }}>
            <CardHeader
              avatar={
                <Avatar
                  src={details.imgUrl}
                  sx={{ width: 160, height: 160 }}
                  alt={details.name}
                />
              }
              title={
                <Grid>
                  <Typography variant="h2" align="left">
                    {details.name}
                  </Typography>
                </Grid>
              }
              subheader={
                <Grid container>
                  <Typography variant="h5" align="left">
                    {details.breed}, {getAge(details.birthdate)}
                  </Typography>
                </Grid>
              }
              action={
                <Grid container mt={5} mr={2}>
                  <IconButton onClick={navToEdit}>
                    <Tooltip title="Edit">
                      <EditIcon fontSize="large" />
                    </Tooltip>
                  </IconButton>
                </Grid>
              }
            />
            <Grid container direction="row" mb={2}>
              <Typography variant="body1" ml={5}>
                Height: {details.height} cm
              </Typography>
              <Typography variant="body1" ml={5}>
                Weight: {details.weight} kg
              </Typography>
            </Grid>
            <Divider />
            <CardContent>
              <Grid container justifyContent="center">
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                  <Tab label="Medical" />
                  <Tab label="Carers" />
                  <Tab label="Tasks" />
                  <Tab label="Groups" />
                </Tabs>
              </Grid>
              <TabPanel value={value} index={0}>
                <PetMedical medical={details.medical} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PetCarers
                  carers={details.members}
                  onDeleteUser={onDeleteUser}
                  onAddUser={onAddUser}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <PetTasks tasks={details.tasks} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <PetGroups groups={details.groups} />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default PetDetails;
