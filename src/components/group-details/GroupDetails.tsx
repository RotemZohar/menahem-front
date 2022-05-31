import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "use-http";
import { useParams } from "react-router-dom";
import { Group as groupDetails } from "../../types/group";
import TabPanel from "../tab-panel/TabPanel";
import GroupCarers from "./GroupCarers";
import GroupPets from "./GroupPets";

const GroupDetails = () => {
  const { get, loading, error } = useFetch("/group");
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState<groupDetails>();
  const { groupId } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
              maxWidth: 600,
              minHeight: 400,
              m: 3,
            }}
          >
            <CardHeader
              // avatar={<Avatar alt={details.name} />}
              title={details.name}
              subheader={details.description}
              action={
                <IconButton>
                  <Tooltip title="Edit">
                    <EditIcon />
                  </Tooltip>
                </IconButton>
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
