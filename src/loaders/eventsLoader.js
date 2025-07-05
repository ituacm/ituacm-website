import { getEvents } from "../api/events";

export const eventsLoader = async () => {
  const response = await fetch(
    "https://66b9a5b1fa763ff550f8f787.mockapi.io/ituacm-website-ekibi/Posts"
  );
  if (!response.ok) {
    throw new Response("Failed to fetch events", { status: 500 });
  }
  const data = await response.json();
  const formattedData = data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  return formattedData;

  // try {
  //   const data = await getEvents();
  //   const formattedData = data.map((event) => ({
  //     ...event,
  //     start: new Date(event.start),
  //     end: new Date(event.end),
  //   }));
  //   return formattedData;
  // } catch (error) {
  //   console.error("Error fetching or formatting events:", error);
  //   throw error; // Re-throw the error after logging it
  // }
};
