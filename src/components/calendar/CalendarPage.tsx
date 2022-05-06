import React, { useEffect, useMemo, useState } from "react";
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetch from "use-http";

interface Task {
    _id: string;
    title: string;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    isCompleted: boolean;
}

function convertTaskToCalendarEvent(tasks: Task[]) {
    const events: any[] = [];
    tasks.forEach(task => {
        events.push({
            title: task.title,
            start: task.dateFrom,
            end: task.dateTo,
        });
    });
    return events;
}

function CalendarPage() {  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const user = ""; // TODO: Temporary - delete!

  const { get, response, error } = useFetch("/api/pets");

  useEffect(() => {
    get();
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
            />
          </div>
    );
};

export default CalendarPage;
  

// [
//     {
//       title: 'All Day Event',
//       start: '2022-04-01',

//     //   backgroundColor: 'red'
//     },
//     {
//       title: 'Long Event',
//       start: '2022-04-07',
//       end: '2022-04-10'
//     },
//     {
//       groupId: '999',
//       title: 'Repeating Event',
//       start: '2022-04-09T16:00:00'
//     },
//     {
//       groupId: '999',
//       title: 'Repeating Event',
//       start: '2022-04-16T16:00:00'
//     },
//     {
//       title: 'Conference',
//       start: '2022-04-11',
//       end: '2022-04-13'
//     },
//     {
//       title: 'Meeting',
//       start: '2022-04-12T10:30:00',
//       end: '2022-04-12T12:30:00'
//     },
//     {
//       title: 'Lunch',
//       start: '2022-04-12T12:00:00'
//     },
//     {
//       title: 'Meeting',
//       start: '2022-04-12T14:30:00'
//     },
//     {
//       title: 'Birthday Party',
//       start: '2022-04-13T07:00:00'
//     },
//     {
//       title: 'Click for Google',
//       url: 'http://google.com/',
//       start: '2022-04-28'
//     }
//   ]