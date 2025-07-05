import { supabase } from "../api/supabaseClient";

export const calendarLoader = async () => {
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
    start: new Date(event.start),
    end: new Date(event.end),
    id: elementId++,
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
        id: elementId++,
        courseId: course.id,
        title: lecture.subject,
        image: course.image,
        start: new Date(lecture.start),
        end: new Date(lecture.end),
      }));
    return {
      ...course,
      lectures: courseLectures,
      start:
        courseLectures.length > 0 ? new Date(courseLectures[0].start) : null,
      end:
        courseLectures.length > 0
          ? new Date(courseLectures[courseLectures.length - 1].end)
          : null,
    };
  });

  const calendarData = {
    events: formattedEventsData,
    courses: formattedCoursesData,
  };

  return calendarData;
};
