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
import { useSelector } from "react-redux";
import { Group } from "../../types/group";
import { RootState } from "../../redux/store";

const GroupsPage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const [groups, setGroups] = useState<Group[]>([]);
  const { get } = useFetch(`/user/${userId}`);

  useEffect(() => {
    get(`/groups`)
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

  const groupsCards = () =>
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
    ));

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
