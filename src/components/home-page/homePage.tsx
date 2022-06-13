import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  Divider,
  Grid,
  List,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../loader/Loader";
import { Pet, Task } from "../../types/pet";
import TaskItem from "./taskItem";
import noTasks from "../../assets/no-tasks.png";
import tasksLogo from "../../assets/todays-tasks.png";

const HomePage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const {
    data: todayTasks = [],
    loading: loadingTasks,
    error: tasksError,
  } = useFetch(`/user/${userId}/today-tasks`, {}, [userId]);
  const { put } = useFetch("/pet");
  const { data: user } = useFetch<{ name: string }>(`/user/${userId}`, {}, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  if (tasksError) {
    return <Typography sx={{ fontSize: "26px" }}>Error occured</Typography>;
  }

  if (todayTasks.length === 0) {
    return (
      <Grid item xs={12} mt={2}>
        <img src={noTasks} alt="You have no tasks for today" width="450" />
      </Grid>
    );
  }

  return (
    <Box>
      <Typography>Hello, {user?.name || ""}!</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} mt={2} mb={1}>
          <img src={tasksLogo} alt="You have no tasks for today" width="450" />
        </Grid>
        <Paper
          sx={{
            width: "100%",
            maxWidth: 550,
            bgcolor: "background.paper",
            borderRadius: 5,
            elevation: 3,
            mb: 3,
          }}
        >
          {todayTasks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((pet: Pet) =>
              pet.tasks.map((task) => (
                <TaskItem pet={pet} task={task} toggleTodo={toggleTodo} />
              ))
            )}
          <Divider />
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={todayTasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Box>
  );
};

export default HomePage;
