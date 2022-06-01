import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, List, Typography } from "@mui/material";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../loader/Loader";
import { Pet, Task } from "../../types/pet";
import TaskItem from "./taskItem";

const HomePage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const { data: todayTasks = [], loading: loadingTasks } = useFetch(
    `/user/${userId}/today-tasks`,
    {},
    [userId]
  );

  const { put } = useFetch("/pet");

  const toggleTodo = async (petId: string, taskId: string, status: boolean) => {
    const editStatus = await put(`/${petId}/${taskId}/changeStatus`, {
      isCompleted: status,
    });

    if (editStatus === "Changed") {
      const currentPet = todayTasks.find((pet: Pet) => pet._id === petId);
      const currentTask = currentPet.tasks.find(
        (task: Task) => task._id === taskId
      );
      currentTask.isCompleted = status;
    }
  };

  if (loadingTasks) {
    return <Loader />;
  }

  if (todayTasks.length === 0) {
    return (
      <Typography sx={{ fontSize: "26px" }}>
        You have no tasks for today
      </Typography>
    );
  }

  return (
    <Box sx={{ marginLeft: "33%", marginRight: "33%" }}>
      <Grid container direction="column">
        <Grid item margin={1} xs={16}>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {todayTasks.map((pet: Pet) =>
              pet.tasks.map((task) => (
                <TaskItem pet={pet} task={task} toggleTodo={toggleTodo} />
              ))
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
