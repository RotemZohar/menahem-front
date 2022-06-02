import { Box, Button, Dialog, DialogTitle, Grid, MenuItem, Popover, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface Task {
  _id: string,
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  isCompleted: boolean;
}

function UpdateTaskDialog(props: {onClose: any, updateTask: any, open: boolean, task?: Task, petsList: { _id: string, name: string }[], selectedPetId?: string}) {
    const { onClose, updateTask, open, task, petsList, selectedPetId } = props;

    const [taskId, setTaskId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dateFrom, setDateFrom] = useState(
        moment(new Date()).format("DD/MM/YYYY HH:mm")
    );
    const [dateTo, setDateTo] = useState(
        moment(new Date()).format("DD/MM/YYYY HH:mm")
    );
    const [isCompleted, setIsCompleted] = useState(false);
    const [pet, setPet] = useState<string>("");


    const [titleError, setTitleError] = useState(false);
    const [datesError, setDatesError] = useState(
        new Date(dateFrom).getTime() > new Date(dateTo).getTime()
    );

    useEffect(() => {
      setTaskId(task ? task._id : "");
      setTitle(task ? task.title : "");
      setDescription(task ? task.description : "");
      setDateFrom(task ? moment(task.dateFrom).format("DD/MM/YYYY HH:mm") : moment(new Date()).format("DD/MM/YYYY HH:mm"));
      setDateTo(task ? moment(task.dateTo).format("DD/MM/YYYY HH:mm") : moment(new Date()).format("DD/MM/YYYY HH:mm"));
      setIsCompleted(task ? task.isCompleted : false);

      const selectedPet = petsList?.find(p => p._id === selectedPetId);
      setPet(selectedPet ? selectedPet.name : "");

      setTitleError(false);
      setTitleError(false);
    }, [open]);

    const closeDialog = () => {
        onClose();
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateTask({
            _id: taskId,
            title,
            description,
            dateFrom,
            dateTo,
            petId: petsList?.find(p => p.name === pet)?._id,
            isCompleted
        });
        onClose();
    };


    return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle style={{textAlign: "center"}}>{taskId ? "Edit Task" : "Add Task"}</DialogTitle>      
        <Box component="form" onSubmit={onSubmit}>
          <Grid container justifyContent="center">
            <Grid item margin={1} xs={10.3}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTitleError(!title)}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                helperText={titleError ? "Please insert title" : ""}
                error={titleError}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="From"
                type="datetime-local"
                value={dateFrom}
                onChange={(e) => setDateFrom(moment().format(e.target.value))}
                onBlur={() => setDatesError(new Date(dateFrom).getTime() > new Date(dateTo).getTime())}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                helperText={datesError ? "Dates range not valid" : ""}
                error={datesError}
              />
            </Grid>
            <Grid item margin={1} xs={5}>
              <TextField
                label="To"
                type="datetime-local"
                value={dateTo}
                onChange={(e) => setDateTo(moment().format(e.target.value))}
                onBlur={() => setDatesError(new Date(dateFrom).getTime() > new Date(dateTo).getTime())}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                helperText={datesError ? "Dates range not valid" : ""}
                error={datesError}
              />
            </Grid>
            <Grid item margin={1} xs={10.3}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                minRows={3}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {/* ({ () => taskId ? () : () }) */}
            <Grid item margin={1} xs={10.3}>
                <TextField
                    label="Pet"
                    select
                    fullWidth
                    value={pet}
                    required
                    onChange={(e) => setPet(e.target.value)}
                >
                    {petsList?.map((option) => (
                    <MenuItem key={option._id} value={option.name}>
                        {option.name}
                    </MenuItem>
                    ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item margin={3}>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>    
    </Dialog>
        
      );
}

export default UpdateTaskDialog;