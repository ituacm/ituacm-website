import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import "./Courses.css";
import CourseModal from "../Modals/CourseModal/CourseModal";
import { useSearchParams } from "react-router-dom";

function Courses({
  courses,
  header = "",
  filter = () => true,
  sort = null,
  visible = 0,
}) {
  const defaultVisibleCourseCount = visible;
  const [visibleCourses, setVisibleCourses] = useState(
    defaultVisibleCourseCount
  );
  const [showMore, setShowMore] = useState(false);
  const toggleShowMoreCourses = () => {
    if (!showMore) {
      setVisibleCourses(courses.length);
    } else {
      setVisibleCourses(defaultVisibleCourseCount);
    }
    setShowMore(!showMore);
  };

  const [searchParams] = useSearchParams();
  const modalCourse = courses.find(
    (course) => course._id === searchParams.get("id")
  );

  useEffect(() => {
    modalCourse
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [modalCourse]);
  const [listingCourses, setListingCourses] = useState(
    courses.sort(sort).filter(filter)
  );

  return listingCourses.length ? (
    <div className="courses-container">
      <div className="courses">
        {header ? <h1 className="courses-header">{header}</h1> : null}
        <div className="courses-list">
          {!visible
            ? listingCourses.map((course, index) => {
                return (
                  <div key={index} className="course">
                    <CourseCard course={course} page={"courses"} />
                  </div>
                );
              })
            : listingCourses.slice(0, visibleCourses).map((course, index) => {
                return (
                  <div key={index} className="course">
                    <CourseCard course={course} page={"courses"} />
                  </div>
                );
              })}
        </div>
        {visible && listingCourses.length > visible ? (
          <button
            className="primary-button courses-show-button"
            onClick={toggleShowMoreCourses}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        ) : null}
      </div>
      {modalCourse && <CourseModal course={modalCourse} />}
    </div>
  ) : null;
}

export default Courses;
