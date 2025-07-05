import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventModal.css";
import { IoCalendarSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  NextWeekLabel,
  PastEventLabel,
  ThisWeekLabel,
  TodayLabel,
  TomorrowLabel,
} from "../../Labels/Label";

function EventModal({ event }) {
  const navigate = useNavigate();
  const clearModal = () => {
    navigate({
      pathname: window.location.pathname,
    });
  };
  function weekDiffFromToday(date) {
    const today = new Date();
    let weekDiff = 0;
    while (date > today) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() == 1) weekDiff++;
    }
    return weekDiff;
  }
  return (
    <div className="event-modal-container">
      <div className="event-modal-overlay" onClick={clearModal}></div>
      <div className="event-modal-content">
        <div className="event-modal-time-label">
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            const eventStart = new Date(event.start);
            eventStart.setHours(0, 0, 0, 0);
            if (
              today.getDate() == eventStart.getDate() &&
              today.getMonth() == eventStart.getMonth() &&
              today.getFullYear() == eventStart.getFullYear()
            ) {
              return <TodayLabel />;
            } else if (eventStart < today) {
              return <PastEventLabel />;
            } else if (
              tomorrow.getDate() == eventStart.getDate() &&
              tomorrow.getMonth() == eventStart.getMonth() &&
              tomorrow.getFullYear() == eventStart.getFullYear()
            ) {
              return <TomorrowLabel />;
            } else if (weekDiffFromToday(eventStart) == 0) {
              return <ThisWeekLabel />;
            } else if (weekDiffFromToday(eventStart) == 1) {
              return <NextWeekLabel />;
            }
          })()}
        </div>
        <div className="event-modal-content-left">
          <img src={event.image} className="event-modal-photo" />
        </div>
        <div className="event-modal-content-right">
          <div className="event-modal-content-right-top">
            <h1 className="event-modal-title">{event.title}</h1>
            <p className="event-modal-description">{event.description}</p>
            <p className="event-modal-text">{event.content}</p>
          </div>
          <div className="event-modal-content-right-bottom">
            <div className="event-modal-details">
              <div className="event-modal-detail-section">
                <IoCalendarSharp className="event-modal-icon" />
                <p>{event.start.toDateString()}</p>
              </div>
              <div className="event-modal-detail-section">
                <FaRegClock className="event-modal-icon" />
                {event.start.getMinutes() % 10 == 0 ? (
                  <p>
                    {event.start.getHours() +
                      ":" +
                      "0" +
                      event.start.getMinutes()}
                  </p>
                ) : (
                  <p>
                    {event.start.getHours() + ":" + event.start.getMinutes()}
                  </p>
                )}
              </div>
              <div className="event-modal-detail-section">
                <MdLocationOn className="event-modal-icon" />
                <p>{event.location}</p>
              </div>
            </div>
            <a
              target="_blank"
              href={event.registrationLink}
              className="primary-button"
            >
              Join this event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
