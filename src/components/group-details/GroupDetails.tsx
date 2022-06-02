import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import useFetch from "use-http";
import { useNavigate, useParams } from "react-router-dom";
import { Group as groupDetails } from "../../types/group";
import TabPanel from "../tab-panel/TabPanel";
import GroupCarers from "./GroupCarers";
import GroupPets from "./GroupPets";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { get, loading, error } = useFetch("/group");
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState<groupDetails>();
  const { groupId } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navToEdit = () => {
    navigate(`/group/${groupId}/edit`);
  };

  useEffect(() => {
    get(`/${groupId}`)
      .then((group) => {
        setDetails(group);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {error && error.message}
      {loading && "Loading..."}
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
                <GroupCarers carers={details.members} />
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default GroupDetails;
