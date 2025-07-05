import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import isoWeek from "dayjs/plugin/isoWeek";
import "./EventCalendar.css";
import EventCard from "../EventCard/EventCard";
import EventModal from "../Modals/EventModal/EventModal";
import { useSearchParams } from "react-router-dom";
import CourseModal from "../Modals/CourseModal/CourseModal";

dayjs.extend(isoWeek);

const localizer = dayjsLocalizer(dayjs);

function EventCalendar({ events, courses }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    console.log(event);
  };

  const eventStyleGetter = (event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventStart = new Date(event.start);
    eventStart.setHours(0, 0, 0, 0);

    const className = `${eventStart < today ? "rbc-event--past" : ""} ${
      event.subject ? "rbc-event--course" : "rbc-event--event"
    }`;
    return {
      className,
    };
  };
  useEffect(() => {
    console.log(courses);
  }, []);
  const [searchParams] = useSearchParams();
  const modalEvent =
    Number(searchParams.get("id")) < 1000
      ? events.find((event) => event.id.toString() === searchParams.get("id"))
      : courses.find(
          (course) => course.id.toString() === searchParams.get("id")
        );
  useEffect(() => {
    modalEvent
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [modalEvent]);
  return (
    <div className="event-calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        onSelectEvent={handleSelectEvent}
        views={["month", "week", "agenda"]}
        min={new Date().setHours(10, 0, 0, 0)}
        eventPropGetter={eventStyleGetter}
      />
      {selectedEvent ? (
        <div className="calendar-selected-event-details">
          <EventCard event={selectedEvent} page={"calendar"} />
        </div>
      ) : (
        <div className="calendar-event-not-selected">
          <p>Select an event from calendar</p>
        </div>
      )}
      {modalEvent && modalEvent.lectures && <CourseModal course={modalEvent} />}
      {modalEvent && !modalEvent.lectures && <EventModal event={modalEvent} />}
    </div>
  );
}

export default EventCalendar;
