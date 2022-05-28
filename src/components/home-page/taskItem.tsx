import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Pet, Task } from "../../types/pet";

// interface deleteTodoVariable {
//   id: number;
// }
interface TaskItemProps {
  pet: Pet;
  task: Task;
}

// interface deleteTodo {
//   deleteTodo: Boolean;
// }

// interface toggleTodoVariable {
//   id: number;
// }

// interface toggleTodo {
//   toggleTodo: Todo;
// }

const TaskItem: React.FC<TaskItemProps> = ({ pet, task }) => {
  // const TaskItem = () => {
  // const onDeleteItem = async () => {
  //   setBackdropStatus(true);
  //   const deleteResult = await deleteTodo();
  //   if (deleteResult.data?.deleteTodo) {
  //     dispatch(deleteItem(index));
  //   }
  //   setBackdropStatus(false);
  // };

  const killMe = () => {
    console.log("fddf");
  };

  //   const onCheckedItem = async () => {
  //     setBackdropStatus(true);
  //     const toggleResult = await toggleTodo();
  //     const toggledTodo = toggleResult.data?.toggleTodo;
  //     if (toggledTodo) {
  //       dispatch(checkItem(toggledTodo));
  //     }
  //     setBackdropStatus(false);
  //   };
  return (
    <Box>
      <ListItem
        key={task._id}
        disablePadding
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        <ListItemButton dense>
          {/* <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.isCompleted}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon> */}
          <Checkbox
            edge="start"
            checked={task.isCompleted}
            tabIndex={-1}
            disableRipple
          />
          <ListItemAvatar>
            <Avatar alt={pet._id} src={pet.imgUrl} />
          </ListItemAvatar>
          <ListItemText id={task._id} primary={`${pet.name}`} />
          <ListItemText id={task._id} primary={`${task.title}`} />
          <ListItemText id={task._id} primary={`${task.description}`} />
        </ListItemButton>
      </ListItem>{" "}
    </Box>
  );
};
export default TaskItem;
