import React from "react";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import useFetch from "use-http";
import { Pet, Task } from "../../types/pet";

interface TaskItemProps {
  pet: Pet;
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ pet, task }) => {
  const { put } = useFetch("/pet");

  const onCheckedItem = async () => {
    const editStatus = await put(`/${pet._id}/${task._id}/changeStatus`, {
      isCompleted: !task.isCompleted,
    });
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
