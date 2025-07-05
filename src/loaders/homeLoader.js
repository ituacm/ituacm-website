import { supabase } from "../api/supabaseClient";

export const homeLoader = async () => {
  let elementId = 1;

  // Fetch events
  const { data: eventsData, error: eventsError } = await supabase
    .from("events")
    .select("*");
  if (eventsError) {
    throw new Response("Failed to fetch events", { status: 500 });
  }
  const formattedEventsData = (eventsData || []).map((event) => ({
    ...event,
    id: elementId++,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  // Fetch courses
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*");
  if (coursesError) {
    throw new Response("Failed to fetch courses", { status: 500 });
  }

  // Fetch lectures
  const { data: lectures, error: lecturesError } = await supabase
    .from("lectures")
    .select("*");
  if (lecturesError) {
    throw new Response("Failed to fetch lectures", { status: 500 });
  }

  // Attach lectures to their courses
  const formattedCoursesData = (courses || []).map((course) => {
    const courseLectures = (lectures || [])
      .filter((lecture) => lecture.courseId === course.id)
      .sort((a, b) => a.lectureNumber - b.lectureNumber)
      .map((lecture) => ({
        ...lecture,
        start: new Date(lecture.start),
        end: new Date(lecture.end),
      }));
    return {
      ...course,
      id: elementId++,
      start:
        courseLectures.length > 0 ? new Date(courseLectures[0].start) : null,
      location: courseLectures.length > 0 ? courseLectures[0].location : null,
      lectures: courseLectures,
    };
  });

  const homeData = {
    events: formattedEventsData,
    courses: formattedCoursesData,
  };

  return homeData;
};
