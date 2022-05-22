import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useFetch from "use-http";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Group } from "../../types/group";

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const { get } = useFetch("/auth");

  useEffect(() => {
    get("/user/groups?id=627b5d24258aaa8a7c084780")
      .then((data) => {
        setGroups(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navToGroup = (group: Group) => {
    console.log("Navigating to group");
  };

  const addGroup = () => {
    console.log("add group");
  };

  const groupsCards = useMemo(
    () =>
      groups.map((group) => (
        <CardActionArea onClick={() => navToGroup(group)}>
          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {group.name}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      )),
    [groups]
  );

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        My groups
      </Typography>
      {groupsCards}
      <Fab onClick={addGroup} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  );
};
export default GroupsPage;
