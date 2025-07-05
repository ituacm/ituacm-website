import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./EventsPage.css";
import Events from "../../components/Events/Events";

function EventsPage() {
  const [events, setEvents] = useState(useLoaderData());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="events-page-container">
      <Events
        events={events}
        header="Ongoing Events"
        filter={(event) => new Date() > event.start && new Date() < event.end}
        sort={(a, b) => a.start - b.start}
      />
      <Events
        events={events}
        header="Upcoming Events"
        filter={(event) => event.start > new Date()}
        sort={(a, b) => a.start - b.start}
      />
      <Events
        events={events}
        header="Past Events"
        filter={(event) => new Date() > event.end}
        sort={(a, b) => b.start - a.start}
        visible={4}
      />
    </div>
  );
}

export default EventsPage;
