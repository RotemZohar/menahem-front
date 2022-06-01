import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import useFetch from "use-http";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { Group } from "../../types/group";
import { RootState } from "../../redux/store";
import { routes } from "../../routes";
import Loader from "../loader/Loader";
import groupsLogo from "../../assets/mygroups.png";

const GroupsPage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const options = {};
  const { data: groups = [], loading } = useFetch(
    `/user/${userId}/groups`,
    options,
    [userId]
  );
  const navigate = useNavigate();

  const navToGroup = (group: Group) => {
    console.log("Navigating to group");
  };

  const addGroup = () => {
    navigate(routes.createGroup);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} mt={2}>
        <img src={groupsLogo} alt="my groups" width="380" />
      </Grid>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 550,
          maxHeight: 400,
          bgcolor: "background.paper",
          overflow: "auto",
          borderRadius: 5,
          elevation: 3,
        }}
      >
        {groups.map((group: Group) => (
          <Grid>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <Tooltip title="Delete">
                    <DeleteIcon />
                  </Tooltip>
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                sx={{ height: 100 }}
                alignItems="center"
                onClick={() => navToGroup(group)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={group.name}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  >
                    <GroupsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={group.name}
                  secondary={`Members: ${group.members.length}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Grid>
        ))}
      </Paper>
      <Grid item xs={12} m={2}>
        <Tooltip arrow title="Add Group">
          <Fab onClick={addGroup} color="primary" aria-label="add">
            <GroupAddIcon />
          </Fab>
        </Tooltip>
      </Grid>
    </Grid>
  );
};
export default GroupsPage;
