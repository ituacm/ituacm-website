import React, { useEffect, useState } from "react";
import "./WhatsNext.css";
import EventCard from "../EventCard/EventCard";
import { Link, useSearchParams } from "react-router-dom";
import EventModal from "../Modals/EventModal/EventModal";
import CourseModal from "../Modals/CourseModal/CourseModal";

function WhatsNext({ events }) {
  const [whatsNextEvents, setWhatsNextEvents] = useState([]);

  useEffect(() => {
    const combinedEvents = [...events.events, ...events.courses].filter(
      (event) => new Date() < event.start
    );

    const sortedEvents = combinedEvents.sort((a, b) => a.start - b.start);

    setWhatsNextEvents(sortedEvents.slice(0, 3));
  }, [events]);

  const [searchParams] = useSearchParams();
  const modalEvent = whatsNextEvents.find(
    (event) => event.id.toString() === searchParams.get("id")
  );
  useEffect(() => {
    modalEvent
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [modalEvent]);

  return (
    <div
      className={`whats-next-container ${
        whatsNextEvents.length ? "" : "display-none"
      }`}
    >
      <div className="whats-next">
        <h1 className="whats-next-header">What's Next in ITUACM</h1>
        <div className="whats-next-events">
          {whatsNextEvents.map((event, index) => {
            return (
              <div key={index} className="whats-next-event">
                <EventCard event={event} page={""} />
              </div>
            );
          })}
        </div>
        <Link
          to={"/calendar"}
          className="primary-button whats-next-see-more-button"
        >
          See all
        </Link>
        {modalEvent && modalEvent.lectures && (
          <CourseModal
            course={events.courses.find((course) => modalEvent.id == course.id)}
          />
        )}
        {modalEvent && !modalEvent.lectures && (
          <EventModal event={modalEvent} />
        )}
      </div>
    </div>
  );
}

export default WhatsNext;
