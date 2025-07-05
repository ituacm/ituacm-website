import React, { useEffect, useState } from "react";
import "./CalendarPage.css";
import { useLoaderData } from "react-router-dom";
import EventCalendar from "../../components/EventCalendar/EventCalendar.jsx";

function CalendarPage() {
  const [calendarData, setCalendarData] = useState(useLoaderData());
  const [calendarEvents, setCalendarEvents] = useState([]);
  const courses = calendarData.courses;
  useEffect(() => {
    setCalendarEvents((prevEvents) => [
      ...calendarData.events,
      ...calendarData.courses.flatMap((course) => course.lectures),
    ]);
    window.scrollTo(0, 0);
  }, [calendarData]);
  return (
    <div className="calendar-page-container">
      <EventCalendar events={calendarEvents} courses={courses} />
    </div>
  );
}

export default CalendarPage;
