import React from "react";
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
} from "@mui/material";
import { Pet, Task } from "../../types/pet";

interface TaskItemProps {
  pet: Pet;
  task: Task;
  toggleTodo: (petId: string, taskId: string, status: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ pet, task, toggleTodo }) => {
  const onCheckedItem = async () => {
    toggleTodo(pet._id, task._id, !task.isCompleted);
    task.isCompleted = !task.isCompleted;
  };

  return (
    <Box>
      <ListItem
        key={task._id}
        disablePadding
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
          // backgroundColor: task.isCompleted ? "#e8f5e9" : "#ffffff",
        }}
      >
        <ListItemButton onClick={onCheckedItem} alignItems="center">
          <Checkbox checked={task.isCompleted} tabIndex={-1} disableRipple />
          <ListItemAvatar sx={{ ml: 2 }}>
            <Avatar
              alt={pet.name}
              src={pet.imgUrl}
              sx={{ width: 45, height: 45, mr: 2 }}
            />
          </ListItemAvatar>
          <ListItemText
            id={task._id}
            primary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="button"
              >
                {`${pet.name}`}
              </Typography>
            }
            secondary={
              <Grid container direction="column">
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                >
                  {`${task.title}`}
                </Typography>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="caption"
                >
                  {`${task.description}`}
                </Typography>
              </Grid>
            }
          />
          {/* <ListItemText
            id={task._id}
            primary={`${task.title}`}
            secondary={`${task.description}`}
          /> */}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};
export default TaskItem;
