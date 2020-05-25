import { Calendar } from '@fullcalendar/core';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
let calendar = new Calendar(calendarEl, {
  plugins: [ resourceTimeGridPlugin ],
  defaultView: 'resourceTimeGridDay',
  resources: [
    // your list of resources
  ]
});

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'interaction', 'dayGrid', 'timeGrid' ],
    timeZone: 'UTC',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    eventLimit: true, // when too many events in a day, show the popover
    events: 'https://fullcalendar.io/demo-events.json?overload-day'
  });

  calendar.render();
});