import { Popover, Typography } from "@mui/material";
import React from "react";

function CalendarEvent(props: {eventInfo: any}) {
    const { eventInfo } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div style={{ width: '100%' }}>
          <div
          style={{ 
              padding: 2, 
              borderRadius: 4, 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: eventInfo.event.backgroundColor
              }}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}>
            <img src={eventInfo.event.extendedProps.imgUrl} height="25" width="25" alt="calendar" style={{ borderRadius: 50 }} />
            <span style={{ marginLeft: 5, color: "white" }}>{eventInfo.event.title}</span>
          </div>
          <Popover
            id="mouse-over-popover"
            sx={{
            pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <div style={{ padding: 5, fontSize: "small", border: `2px solid ${eventInfo.event.backgroundColor}` }}>
                <div style={{ fontWeight: "bold" }}>{eventInfo.event.start.toLocaleString()} - {eventInfo.event.end.toLocaleString()}</div>
                <div>{eventInfo.event.extendedProps.description}</div>
            </div>
        </Popover>
        </div>
      );
}

export default CalendarEvent;