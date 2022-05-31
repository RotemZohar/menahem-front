import { Popover, Typography } from "@mui/material";
import React from "react";

function CalendarEvent(props: { eventInfo: any }) {
  const { eventInfo } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ width: "100%" }}>
      <button
        style={{
          padding: 2,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          backgroundColor: eventInfo.event.backgroundColor,
          border: eventInfo.event.backgroundColor,
          width: "100%",
        }}
        aria-describedby={id}
        onClick={handleClick}
        type="button"
      >
        <img
          src={eventInfo.event.extendedProps.imgUrl}
          height="25"
          width="25"
          alt="calendar"
          style={{ borderRadius: 50 }}
        />
        <span style={{ marginLeft: 5, color: "white" }}>
          {eventInfo.event.title}
        </span>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          style={{
            padding: 5,
            fontSize: "small",
            border: `2px solid ${eventInfo.event.backgroundColor}`,
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {eventInfo.event?.start?.toLocaleString()} -{" "}
            {eventInfo.event?.end?.toLocaleString()}
          </div>
          <div>{eventInfo.event.extendedProps.description}</div>
        </div>
      </Popover>
    </div>
  );
}

export default CalendarEvent;
