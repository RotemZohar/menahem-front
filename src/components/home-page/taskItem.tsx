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
import useFetch from "use-http";
import { Pet, Task } from "../../types/pet";

interface TaskItemProps {
  pet: Pet;
  task: Task;
}

// interface toggleTodoVariable {
//   id: number;
// }

// interface toggleTodo {
//   toggleTodo: Todo;
// }

const TaskItem: React.FC<TaskItemProps> = ({ pet, task }) => {
  const { put } = useFetch("/pet");

  const onCheckedItem = async () => {
    console.log("toggled");
    const editStatus = await put(`/${pet._id}/${task._id}/changeStatus`, {
      isCompleted: !task.isCompleted,
    });
    console.log(editStatus);
  };
  return (
    <Box>
      <ListItem
        key={task._id}
        disablePadding
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        <ListItemButton onClick={onCheckedItem} dense>
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
