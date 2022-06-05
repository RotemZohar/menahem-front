import React, { useState, useEffect } from "react";
import {
  Tab,
  Tabs,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";
import TabPanel from "../tab-panel/TabPanel";
import GroupCarers from "./GroupCarers";
import GroupPets from "./GroupPets";
import Loader from "../loader/Loader";
import { User } from "../../types/user";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [carers, setCarers] = useState<User[]>([]);
  const { post, del, get, response } = useFetch("/group");
  const {
    data: details,
    loading,
    error,
  } = useFetch(`/group/${groupId}`, {}, [groupId]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (details) {
      setCarers(details.members);
    }
  }, [details]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navToEdit = () => {
    navigate(`/group/${groupId}/edit`);
  };

  const deleteUserFromGroup = async (userId: string) => {
    const data = await del(`/${groupId}/user/${userId}`);
    if (data === "Deleted") {
      details.members = details.members.filter(
        (member: User) => member._id !== userId
      );

      setCarers(details.members);
    }
  };

  const addUserToGroup = async (users: User[]) => {
    if (users.length === 0) {
      alert("Please add some members!");
    } else {
      const data = await post(`/${groupId}/Users`, {
        usersIds: users,
      });

      users.forEach((user) => {
        details.members.push(user);
      });

      details.members = [...details.members];
      setCarers(details.members);
    }
  };

  return (
    <Box>
      {error && error.message}
      {loading && <Loader />}
      {details && (
        <Grid container justifyContent="center">
          <Card
            sx={{
              width: 600,
              minHeight: 400,
              m: 3,
            }}
          >
            <CardHeader
              title={
                <Grid container m={1}>
                  <Typography
                    variant="h4"
                    align="left"
                    sx={{ fontWeight: "bold" }}
                  >
                    {details.name}
                  </Typography>
                </Grid>
              }
              subheader={
                <Grid container m={1}>
                  <Typography align="left">{details.description}</Typography>
                </Grid>
              }
              action={
                <Grid container>
                  <IconButton onClick={navToEdit}>
                    <Tooltip title="Edit">
                      <EditIcon fontSize="large" />
                    </Tooltip>
                  </IconButton>
                </Grid>
              }
            />
            <Divider />
            <CardContent>
              <Grid container justifyContent="center">
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                  <Tab label="Pets" />
                  <Tab label="Carers" />
                </Tabs>
              </Grid>
              <TabPanel value={value} index={0}>
                <GroupPets pets={details.pets} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GroupCarers
                  carers={carers}
                  deleteUserFromGroup={deleteUserFromGroup}
                  addUserToGroup={addUserToGroup}
                />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Box>
  );
};

export default GroupDetails;
