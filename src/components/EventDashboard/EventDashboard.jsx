import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDashboard.css";
import { supabase } from "../../api/supabaseClient"

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
          const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("id", eventId)
            .single();
          if (error) throw error;
          setEvent(data);
          eventRef.current = data;
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
        content: "",
      };
      setEvent(eventRef.current);
    }
  }, [eventId, isCreateMode]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await supabase.from('events').delete().eq('id', eventId);
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

    const { image, newImageFile, ...eventData } = eventRef.current;
    let imageUrl = image;
    let oldImageFileName;
    // Eğer eski image bir URL ise ve Supabase bucket'ından ise, dosya adını çıkar
    if (image && image.includes('event-images')) {
      // Örnek: https://.../storage/v1/object/public/event-images/filename.jpg
      const parts = image.split('/');
      const idx = parts.findIndex(p => p === 'event-images');
      if (idx !== -1 && parts.length > idx + 1) {
        oldImageFileName = parts.slice(idx + 1).join('/');
      }
    }

    if (newImageFile) {
      const fileExt = newImageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(fileName, newImageFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (uploadError) {
        console.error('Image upload error:', uploadError);
        alert('Görsel yüklenemedi.');
        return;
      }
      // Public URL oluştur
      const { data: publicUrlData } = supabase.storage.from('event-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
      // Eski görseli sil
      if (oldImageFileName) {
        await supabase.storage.from('event-images').remove([oldImageFileName]);
      }
    }

    const eventPayload = {
      ...eventData,
      image: imageUrl,
    };

    try {
      let result;
      if (isCreateMode) {
        result = await supabase.from('events').insert([eventPayload]);
        if (result.error) throw result.error;
        alert('Event created successfully!');
      } else {
        result = await supabase.from('events').update(eventPayload).eq('id', eventId);
        if (result.error) throw result.error;
        alert('Event updated successfully!');
      }
      navigate(-1);
    } catch (error) {
      console.error('Error saving event:', error);
      alert(`Failed to ${isCreateMode ? 'create' : 'update'} event.`);
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
              Content*:
              <textarea
                className="event-dashboard-form-textarea"
                defaultValue={eventRef.current.content}
                onChange={(e) =>
                  (eventRef.current.content = e.target.value)
                }
                required
              />
            </label>
            <br />
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
