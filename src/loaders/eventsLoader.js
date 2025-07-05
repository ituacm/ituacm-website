import { supabase } from "../api/supabaseClient";

export const eventsLoader = async () => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    throw new Response("Failed to fetch events", { status: 500 });
  }
  const formattedData = data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  return formattedData;
};
