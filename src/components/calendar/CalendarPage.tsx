import React, { useEffect, useState } from "react";
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetch from "use-http";
import CalendarEvent from "./CalendarEvent";

interface Task {
  title: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  isCompleted: boolean;
}

function convertTaskToCalendarEvent(petTasks: { imgUrl: string, tasks: Task[] }[]) {
    const events: EventInput[] = [];
    petTasks.forEach(pet => {
      pet.tasks.forEach(task => {
        let backgroundColor = '#3788d8'; // blue
        if ((new Date(task.dateTo)).getTime() < Date.now()) {
          backgroundColor = task.isCompleted ? 'darkgreen' : 'darkred'
        }
        events.push({
            title: task.title,
            start: task.dateFrom,
            end: task.dateTo,
            backgroundColor,
            extendedProps: {
              imgUrl: pet.imgUrl,
              description: task.description
            }

        });
      })
    });
    return events;
}

function renderEventContent(eventInfo: EventInput) {   
  return (
    <CalendarEvent eventInfo={eventInfo} />
  );
}

function CalendarPage() {  
  const [petTasks, setPetTasks] = useState<{ imgUrl: string, tasks: Task[] }[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);
  const user = "62878b66e98c4817164204da"; // TODO: Temporary - delete!

  const { get, response, error } = useFetch("/task");

  useEffect(() => {
    get(`/${user}`).then((res) => {
      setPetTasks(res?.petTasks);
      setCalendarEvents(convertTaskToCalendarEvent(res?.petTasks));
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                height={650}
                events={calendarEvents}
                eventContent={renderEventContent}
            />
          </div>
    );
};

export default CalendarPage;