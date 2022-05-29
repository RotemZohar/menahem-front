import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, List } from "@mui/material";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../loader/Loader";
import { Pet } from "../../types/pet";
import TaskItem from "./taskItem";

const HomePage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const options = {};
  const { data: todayTasks = [], loading: loadingTasks } = useFetch(
    `/user/${userId}/today-tasks`,
    options,
    [userId]
  );

  if (loadingTasks) {
    return <Loader />;
  }

  return (
    <Box sx={{ marginLeft: "33%", marginRight: "33%" }}>
      <Grid container direction="column">
        <Grid item margin={1} xs={16}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {todayTasks.map((pet: Pet) =>
              pet.tasks.map((task) => <TaskItem pet={pet} task={task} />)
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
