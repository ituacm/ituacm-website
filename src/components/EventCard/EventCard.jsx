import React, { useState } from "react";
import "./EventCard.css";
import { IoCalendarSharp } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import {
  LongtermCourseLabel,
  NextWeekLabel,
  PastEventLabel,
  ThisWeekLabel,
  TodayLabel,
  TomorrowLabel,
  WorkshopLabel,
} from "../Labels/Label";
import { useNavigate } from "react-router-dom";

function EventCard({ event, page }) {
  const navigate = useNavigate();
  function createSearchQuery() {
    navigate(`/${page}?id=${event.courseId ? event.courseId : event._id}`);
  }
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
    <>
      <div className="eventcard-container" onClick={createSearchQuery}>
        <div className="eventcard-time-label">
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
        <img
          src={`http://localhost:8080/media/${event.image}`}
          className="eventcard-image"
        />
        <div className="eventcard-detail">
          <div className="eventcard-labels">
            {(() => {
              if (event.lectures) {
                if (event.lectures.length == 1) {
                  return <WorkshopLabel />;
                } else {
                  return <LongtermCourseLabel />;
                }
              }
            })()}
          </div>
          <h1 className="eventcard-title">{event.title}</h1>
          <p className="eventcard-description">{event.description}</p>
          <div className="eventcard-detail-section">
            <IoCalendarSharp className="eventcard-icon" />
            <p className="eventcard-detail-text">
              {event.start.toDateString()}
            </p>
          </div>
          <div className="eventcard-detail-section">
            <FaRegClock className="eventcard-icon" />
            {event.start.getMinutes() % 10 == 0 ? (
              <p className="eventcard-detail-text">
                {event.start.getHours() + ":" + "0" + event.start.getMinutes()}
              </p>
            ) : (
              <p>{event.start.getHours() + ":" + event.start.getMinutes()}</p>
            )}
          </div>
          <div className="eventcard-detail-section">
            <MdLocationOn className="eventcard-icon" />
            <p className="eventcard-detail-text">{event.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCard;
