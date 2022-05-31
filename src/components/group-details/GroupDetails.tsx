import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
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
        <Container>
          <Box padding={3} sx={{ border: 2, borderBottom: 1 }} mt={4} mx={20}>
            <Box display="flex">
              {/* <Avatar
                src={details.imgUrl}
                sx={{ width: 160, height: 160, border: 2 }}
              /> */}
              <Box mx={3} mt={3}>
                <Typography variant="h2" align="left">
                  {details.name}
                </Typography>
                <Typography variant="h5" align="left">
                  {details.description}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ border: 2, borderTop: 0 }} mx={20}>
            <Box sx={{ borderBottom: 1 }}>
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Pets" sx={{ borderRight: 1 }} />
                <Tab label="Carers" sx={{ borderRight: 1 }} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <GroupPets pets={details.pets} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <GroupCarers carers={details.members} />
              </TabPanel>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default GroupDetails;
