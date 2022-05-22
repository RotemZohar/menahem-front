import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetch from "use-http";
import CalendarEvent from "./CalendarEvent";

function convertTaskToCalendarEvent(petTasks: { imgUrl: string, tasks: any[] }[]) {
    const events: any[] = [];
    petTasks.forEach(pet => {
      pet.tasks.forEach(task => {
        let backgroundColor = '#3788d8';
        if ((new Date(task.dateTo)).getTime() < Date.now()) {
          backgroundColor = task.isCompleted ? 'darkred' : 'darkgreen'
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

function renderEventContent(eventInfo: any) {   
  return (
    <CalendarEvent eventInfo={eventInfo} />
  );
}

function CalendarPage() {  
  const [petTasks, setPetTasks] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const user = ""; // TODO: Temporary - delete!

//   const { post, response, error } = useFetch("/task");
  const { get, response, error } = useFetch("/task");

  useEffect(() => {
    get(`/`).then((res) => {
      setPetTasks(res.petTasks);
      setCalendarEvents(convertTaskToCalendarEvent(res.petTasks));
      console.log(res);
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