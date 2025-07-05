import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDashboard.css";

function EventDashboard() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const eventRef = useRef(null);
  const isCreateMode = eventId === "new";

  useEffect(() => {
    if (!isCreateMode) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/events/${eventId}`
          );
          setEvent(response.data);
          eventRef.current = response.data;
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEvent();
    } else {
      // Initialize empty event for create mode
      eventRef.current = {
        title: "",
        description: "",
        image: "",
        location: "",
        start: new Date().toISOString().slice(0, 16),
        end: new Date().toISOString().slice(0, 16),
        registrationLink: "",
      };
      setEvent(eventRef.current);
    }
  }, [eventId, isCreateMode]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:8080/events/${eventId}`);
        alert("Event deleted successfully!");
        navigate(-1);
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { _id, __v, image, newImageFile, ...eventData } = eventRef.current;

    Object.keys(eventData).forEach((key) => {
      formData.append(key, eventData[key]);
    });

    if (newImageFile) {
      formData.append("photo", eventRef.current.newImageFile);
    }

    try {
      if (isCreateMode) {
        await axios.post("http://localhost:8080/events", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Event created successfully!");
      } else {
        await axios.put(`http://localhost:8080/events/${eventId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Event updated successfully!");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error saving event:", error);
      alert(`Failed to ${isCreateMode ? "create" : "update"} event.`);
    }
  };

  return (
    <div className="event-dashboard-container">
      {event ? (
        <div className="event-dashboard-form-wrapper">
          <h2 className="event-dashboard-title">
            {isCreateMode ? "Create New Event" : "Edit Event"}
          </h2>
          <form className="event-dashboard-form" onSubmit={handleSubmit}>
            <label className="event-dashboard-form-label">
              Title*:
              <input
                className="event-dashboard-form-input"
                type="text"
                defaultValue={eventRef.current.title}
                onChange={(e) => (eventRef.current.title = e.target.value)}
                required
              />
            </label>
            <br />
            <label className="event-dashboard-form-label">
              Description*:
              <textarea
                className="event-dashboard-form-textarea"
                defaultValue={eventRef.current.description}
                onChange={(e) =>
                  (eventRef.current.description = e.target.value)
                }
                required
              />
            </label>
            <br />
            {!isCreateMode && (
              <label className="event-dashboard-form-label">
                Current Image:
                <div className="event-dashboard-image-preview">
                  <img
                    src={
                      eventRef.current.image.startsWith("http")
                        ? eventRef.current.image
                        : `http://localhost:8080/media/${eventRef.current.image}`
                    }
                    alt="Event"
                    className="event-dashboard-image"
                  />
                </div>
                <input
                  className="event-dashboard-form-input"
                  type="text"
                  defaultValue={eventRef.current.image}
                  onChange={(e) => (eventRef.current.image = e.target.value)}
                />
              </label>
            )}
            <label className="event-dashboard-form-label">
              {isCreateMode ? "Upload Image*:" : "Upload New Image:"}
              <input
                className="event-dashboard-form-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    eventRef.current.newImageFile = file;
                  }
                }}
                required={isCreateMode}
              />
            </label>
            <br />
            <label className="event-dashboard-form-label">
              Location*:
              <input
                className="event-dashboard-form-input"
                type="text"
                defaultValue={eventRef.current.location}
                onChange={(e) => (eventRef.current.location = e.target.value)}
                required
              />
            </label>
            <br />
            <label className="event-dashboard-form-label">
              Start Date and Time*:
              <input
                className="event-dashboard-form-input"
                type="datetime-local"
                defaultValue={eventRef.current.start.slice(0, 16)}
                onChange={(e) => (eventRef.current.start = e.target.value)}
                required
              />
            </label>
            <br />
            <label className="event-dashboard-form-label">
              End Date and Time*:
              <input
                className="event-dashboard-form-input"
                type="datetime-local"
                defaultValue={eventRef.current.end.slice(0, 16)}
                onChange={(e) => (eventRef.current.end = e.target.value)}
                required
              />
            </label>
            <br />
            <label className="event-dashboard-form-label">
              Registration Link:
              <input
                className="event-dashboard-form-input"
                type="text"
                defaultValue={eventRef.current.registrationLink}
                onChange={(e) =>
                  (eventRef.current.registrationLink = e.target.value)
                }
              />
            </label>
            <br />
            <button
              className="event-dashboard-form-submit-button"
              type="submit"
            >
              {isCreateMode ? "Create" : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <p className="event-dashboard-loading-message">
          Loading event details...
        </p>
      )}
      <button
        className="event-dashboard-back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      {!isCreateMode && (
        <button
          className="event-dashboard-delete-button"
          onClick={handleDelete}
        >
          Delete Event
        </button>
      )}
    </div>
  );
}

export default EventDashboard;
