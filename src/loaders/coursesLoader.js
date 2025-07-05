import { supabase } from "../api/supabaseClient";

export const coursesLoader = async () => {
  // Fetch all courses
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("*");
  if (coursesError) {
    throw new Response("Failed to fetch courses", { status: 500 });
  }

  // Fetch all lectures
  const { data: lectures, error: lecturesError } = await supabase
    .from("lectures")
    .select("*");
  if (lecturesError) {
    throw new Response("Failed to fetch lectures", { status: 500 });
  }

  // Attach lectures to their courses
  const formattedData = courses.map((course) => {
    const courseLectures = lectures
      .filter((lecture) => lecture.courseId === course.id)
      .sort((a, b) => a.lectureNumber - b.lectureNumber)
      .map((lecture) => ({
        ...lecture,
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
  return formattedData;
};
