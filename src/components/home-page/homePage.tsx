import * as React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { RootState } from "../../redux/store";
import Loader from "../loader/Loader";
import { Pet } from "../../types/pet";
import TaskItem from "./taskItem";

const HomePage = () => {
  const userId = useSelector((state: RootState) => state.userReducer._id);
  const options = {};
  const { data: todayTasks = [], loading: loadingTasks } = useFetch(
    `/user/${userId}/tasks`,
    options,
    [userId]
  );
  // const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value: string) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  useEffect(() => {
    console.log(todayTasks);
  }, [todayTasks]);

  const handleToggle = (value: string) => () => {
    todayTasks[0].tasks[0].isCompleted = true;
    console.log("Fdfd");
  };

  const taskItems = () => {
    // todayTasks.forEach(  (pet: Pet) => {
    //     <ListItem key={pet._id} disablePadding>
    //       <ListItemButton role={undefined} onClick={handleToggle(pet.tasks/>)} dense>
    //         <ListItemIcon>
    //           <Checkbox
    //             edge="start"
    //             checked={checked.indexOf(value) !== -1}
    //             tabIndex={-1}
    //             disableRipple
    //             inputProps={{ "aria-labelledby": labelId }}
    //           />
    //         </ListItemIcon>
    //         <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
    //       </ListItemButton>
    //     </ListItem>;
    //   });
  };

  // const killMe = () => {
  //   todayTasks.map((pet: Pet) => <Button>{pet.name}</Button>);
  // };
  // const list = useMemo(
  //   () =>
  //     posts.map((post) => (
  //       <PostCard
  //         id={post._id}
  //         imgUrl={post.imgUrl}
  //         title={post.title}
  //         text={post.text}
  //         tag={post.tag}
  //         isEdit={false}
  //         isAdminUser
  //       />
  //     )),
  //   []
  // );

  if (loadingTasks) {
    return <Loader />;
  }

  return (
    // <Box sx={{ marginLeft: "33%", marginRight: "33%" }}>
    <Box sx={{ marginLeft: "33%", marginRight: "33%" }}>
      <Grid container direction="column">
        <Grid item margin={1} xs={16}>
          {/* {todayTasks.map((pet: Pet) =>
            pet.tasks.map((task) => <Button>{task.title}</Button>)
          )} */}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {todayTasks.map((pet: Pet) =>
              pet.tasks.map((task) => (
                <TaskItem pet={pet} task={task} /> // <ListItem
                //   key={task._id}
                //   disablePadding
                //   style={{
                //     textDecoration: task.isCompleted ? "line-through" : "none",
                //   }}
                // >
                //   <ListItemButton onClick={handleToggle(task._id)} dense>
                //     {/* <ListItemIcon>
                //       <Checkbox
                //         edge="start"
                //         checked={task.isCompleted}
                //         tabIndex={-1}
                //         disableRipple
                //       />
                //     </ListItemIcon> */}
                //     <Checkbox
                //       edge="start"
                //       checked={task.isCompleted}
                //       tabIndex={-1}
                //       disableRipple
                //     />
                //     <ListItemAvatar>
                //       <Avatar alt={pet._id} src={pet.imgUrl} />
                //     </ListItemAvatar>
                //     <ListItemText id={task._id} primary={`${pet.name}`} />
                //     <ListItemText id={task._id} primary={`${task.title}`} />
                //     <ListItemText
                //       id={task._id}
                //       primary={`${task.description}`}
                //     />
                //   </ListItemButton>
                // </ListItem>
              ))
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
