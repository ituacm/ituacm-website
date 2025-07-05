import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./CoursesDashboard.css";

function CoursesDashboard() {
  const [courses, setCourses] = useState(useLoaderData);
  const navigate = useNavigate();
  return (
    <>
      <div className="courses-dashboard-container">
        <h2>Courses Dashboard</h2>
        <ul className="courses-dashboard-list">
          <li
            className="courses-dashboard-element courses-dashboard-create"
            onClick={() => navigate("new")}
          >
            + Create New Course
          </li>
          {courses.map((course) => {
            return (
              <li
                className="courses-dashboard-element"
                onClick={() => {
                  navigate(course._id);
                }}
                key={course._id}
              >
                {course.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CoursesDashboard;
