import { Button, Grid, Popover, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function CalendarEvent(props: {eventInfo: any, editTask: any, deleteTask: any, completeTask: any}) {
    const { eventInfo, editTask, deleteTask, completeTask } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleCompleteTask = () => {
        const { petId, taskId } = eventInfo.event.extendedProps;
        completeTask({ petId, taskId })
      };
    
      const handleDeleteTask = () => {
        const { petId, taskId } = eventInfo.event.extendedProps;
        deleteTask({ petId, taskId })
      };
    
      const handleEditTask = () => {
        const { petId, taskId } = eventInfo.event.extendedProps;
        editTask({ petId, taskId });
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{ width: '100%' }}>
          <Tooltip title="Press task for more details">
            <button
            style={{ 
                padding: 2, 
                borderRadius: 4, 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: eventInfo.event.backgroundColor,
                border: eventInfo.event.backgroundColor,
                width: '100%'
                }}
                aria-describedby={id}
                onClick={handleClick}
                type="button">
              <img 
                src={eventInfo.event.extendedProps.imgUrl} 
                title={eventInfo.event.extendedProps.name} 
                height="25" 
                width="25" 
                alt="calendar" 
                style={{ borderRadius: 50 }} />
              <span style={{ marginLeft: 5, color: "white" }}>{eventInfo.event.title}</span>
            </button>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
        >
            <div style={{ padding: "1rem", fontSize: "small", border: `3px solid ${eventInfo.event.backgroundColor}` }}>
                <div style={{ fontWeight: "bold" }}>{moment(eventInfo.event.start).format("DD/MM/YYYY HH:mm")} - {moment(eventInfo.event.end).format("DD/MM/YYYY HH:mm")}</div>
                <div style={{ marginTop: "0.5rem" }}>{eventInfo.event.extendedProps.description}</div>
                <Grid container justifyContent="center" style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}>
                  <DeleteIcon style={{ marginRight: "auto" }} onClick={handleDeleteTask} />
                  <Button variant="contained" style={{ fontSize: "smaller" }} onClick={handleCompleteTask}>Task Completed!</Button>
                  <EditIcon style={{ marginLeft: "auto" }} onClick={handleEditTask} />
                </Grid>
            </div>
        </Popover>
        </div>
      );
}

export default CalendarEvent;