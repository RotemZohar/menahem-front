import * as React from "react";
import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import useFetch from "use-http";
import Fab from "@mui/material/Fab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} mt={2}>
        <img src={groupsLogo} alt="my groups" width="380" />
      </Grid>
      <Paper
        sx={{
          width: "100%",
          maxWidth: 480,
          bgcolor: "background.paper",
          borderRadius: 5,
          elevation: 3,
        }}
      >
        {groups
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((group: Group) => (
            <Grid>
              <ListItem ContainerComponent="div" disablePadding>
                <ListItemButton
                  sx={{ height: 80 }}
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
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={groups.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
