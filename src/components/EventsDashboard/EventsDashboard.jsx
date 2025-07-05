import React, { useState } from "react";
import "./EventsDashboard.css";
import { useLoaderData, useNavigate } from "react-router-dom";

function EventsDashboard() {
  const [events, setEvents] = useState(useLoaderData);
  const navigate = useNavigate();
  return (
    <>
      <div className="events-dashboard-container">
        <h2>Events Dashboard</h2>
        <ul className="events-dashboard-list">
          <li
            className="events-dashboard-element events-dashboard-create"
            onClick={() => navigate("new")}
          >
            + Create New Event
          </li>
          {events.map((event) => {
            return (
              <li
                className="events-dashboard-element"
                onClick={() => {
                  navigate(event._id);
                }}
                key={event._id}
              >
                {event.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default EventsDashboard;
