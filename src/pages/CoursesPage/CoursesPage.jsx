import React, { useEffect, useState } from "react";
import "./CoursesPage.css";
import { useLoaderData } from "react-router-dom";
import Courses from "../../components/Courses/Courses.jsx";

function CoursesPage() {
  const [courses, setCourses] = useState(useLoaderData());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="courses-page-container">
      <Courses
        courses={courses}
        header="Ongoing Courses"
        sort={(a, b) => a.start - b.start}
        filter={(course) =>
          new Date() > course.start && new Date() < course.end
        }
      />
      <Courses
        courses={courses}
        header="Upcoming Courses"
        sort={(a, b) => a.start - b.start}
        filter={(course) => course.start > new Date()}
      />
      <Courses
        courses={courses}
        header="Past Courses"
        sort={(a, b) => b.start - a.start}
        filter={(course) => new Date() > course.end}
      />
    </div>
  );
}

export default CoursesPage;
