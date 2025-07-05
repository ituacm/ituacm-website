import axios from "axios";
import { getCourses } from "../api/courses";

export const coursesLoader = async () => {
  const response = await fetch("/courses.json");
  if (!response.ok) {
    throw new Response("Failed to fetch events", { status: 500 });
  }
  const data = await response.json();
  const formattedData = data.map((course) => ({
    ...course,
    lectures: course.lectures.map((lecture) => ({
      ...lecture,
      start: new Date(lecture.start),
      end: new Date(lecture.end),
    })),
    start: new Date(course.lectures[0].start),
    end: new Date(course.lectures[course.lectures.length - 1].end),
  }));
  return formattedData;
  // try {
  //   const data = await getCourses();
  //   console.log("Courses: " + data[0]._id);
  //   const formattedData = data.map((course) => ({
  //     ...course,
  //     lectures: course.lectures.map((lecture) => ({
  //       ...lecture,
  //       start: new Date(lecture.start),
  //       end: new Date(lecture.end),
  //     })),
  //     start:
  //       course.lectures.length > 0
  //         ? new Date(course.lectures[0].start)
  //         : new Date(),
  //     end:
  //       course.lectures.length > 0
  //         ? new Date(course.lectures[course.lectures.length - 1].end)
  //         : new Date(),
  //   }));
  //   return formattedData;
  // } catch (error) {
  //   console.log("Error getting courses: " + error);
  //   return [];
  // }
};
