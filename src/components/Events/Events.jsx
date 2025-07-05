import React, { useEffect, useState } from "react";
import "./Events.css";
import EventCard from "../EventCard/EventCard";
import { useSearchParams } from "react-router-dom";
import EventModal from "../Modals/EventModal/EventModal";

function Events({
  events = [],
  header = "",
  filter = () => true,
  sort = undefined,
  visible = 0,
}) {
  const [visibleEvents, setVisibleEvents] = useState(visible);
  const [showMore, setShowMore] = useState(false);
  const toggleShowMoreEvents = () => {
    if (!showMore) {
      setVisibleEvents(events.length);
    } else {
      setVisibleEvents(visible);
    }
    setShowMore(!showMore);
  };

  const [searchParams] = useSearchParams();
  const modalEvent = events.find(
    (event) => event._id === searchParams.get("id")
  );

  useEffect(() => {
    modalEvent
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [modalEvent]);
  const [listingEvents, setListingEvents] = useState(
    events.sort(sort).filter(filter)
  );

  return listingEvents.length ? (
    <div className="events-container">
      <div className="events">
        {header ? <h1 className="events-header">{header}</h1> : null}
        <div className="events-list">
          {!visible
            ? listingEvents.map((event, index) => {
              return (
                <div key={index} className="event">
                  <EventCard event={event} page={"events"} />
                </div>
              );
            })
            : listingEvents.slice(0, visibleEvents).map((event, index) => {
              return (
                <div key={index} className="event">
                  <EventCard event={event} page={"events"} />
                </div>
              );
            })}
        </div>
        {visible && listingEvents.length > visible ? (
          <button
            className="primary-button events-show-button"
            onClick={toggleShowMoreEvents}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        ) : null}
      </div>
      {modalEvent && <EventModal event={modalEvent} />}
    </div>
  ) : (
    <></>
  );
}

export default Events;
