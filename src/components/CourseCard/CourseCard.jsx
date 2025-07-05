import React, { useState } from "react";
import "./CourseCard.css";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoCalendarSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import LectureCard from "../LectureCard/LectureCard";
import { useNavigate } from "react-router-dom";
import {
  LongtermCourseLabel,
  NextWeekLabel,
  OngoingLabel,
  PastEventLabel,
  StartsTodayLabel,
  ThisWeekLabel,
  TodayLabel,
  TomorrowLabel,
  WorkshopLabel,
} from "../Labels/Label";

function CourseCard({ course }) {
  // const [selectedLecture, setSelectedLecture] = useState(0);
  // const handleNextLecture = () => {
  //   if (selectedLecture == course.lectures.length - 1) {
  //     return;
  //   }
  //   setSelectedLecture(selectedLecture + 1);
  // };
  // const handlePrevLecture = () => {
  //   if (selectedLecture == 0) {
  //     return;
  //   }
  //   setSelectedLecture(selectedLecture - 1);
  // };

  const navigate = useNavigate();
  function createSearchQuery() {
    navigate(`/courses?id=${course.id}`);
  }

  function weekDiffFromToday(date) {
    const today = new Date();
    let weekDiff = 0;
    while (date > today) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() == 1) weekDiff++;
    }
    return weekDiff;
  }

  return (
    <div className="course-card-container">
      <div className="course-card-left">
        <img
          src={course.image}
          className="course-card-image"
        />
        <div className="course-card-time-label">
          {(() => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            const eventStart = new Date(course.start);
            eventStart.setHours(0, 0, 0, 0);
            const eventEnd = new Date(course.end);
            eventEnd.setHours(0, 0, 0, 0);
            if (today > eventStart && eventEnd > today) {
              return <OngoingLabel className="course-card-label" />;
            } else if (
              today.getDate() == eventStart.getDate() &&
              today.getMonth() == eventStart.getMonth() &&
              today.getFullYear() == eventStart.getFullYear()
            ) {
              return <StartsTodayLabel />;
            } else if (
              tomorrow.getDate() == eventStart.getDate() &&
              tomorrow.getMonth() == eventStart.getMonth() &&
              tomorrow.getFullYear() == eventStart.getFullYear()
            ) {
              return <TomorrowLabel />;
            } else if (eventStart < today) {
              return <PastEventLabel />;
            } else if (weekDiffFromToday(eventStart) == 0) {
              return <ThisWeekLabel />;
            } else if (weekDiffFromToday(eventStart) == 1) {
              return <NextWeekLabel />;
            }
          })()}
        </div>
      </div>

      <div className="course-card-right">
        <div className="course-card-content">
          <div className="course-card-content-top">
            <h1 className="course-card-title">{course.title}</h1>
            <p className="course-card-description">{course.description}</p>
            <div className="course-card-labels">
              {(() => {
                if (course.lectures.length == 1) {
                  return <WorkshopLabel />;
                } else {
                  return <LongtermCourseLabel />;
                }
              })()}
            </div>
          </div>

          <div className="course-card-detail-sections">
            <div className="course-card-detail-section">
              <LiaChalkboardTeacherSolid className="course-card-icon" />
              <p className="course-card-detail-text">
                {course.lectures.length +
                  " lessons, " +
                  Math.ceil(
                    (course.end.getTime() - course.start.getTime()) /
                    (1000 * 60 * 60 * 24 * 7)
                  ) +
                  " weeks"}
              </p>
            </div>
            <div className="course-card-detail-section">
              <IoCalendarSharp className="course-card-icon" />
              <p className="course-card-detail-text">
                {"Starting date: " + course.start.toDateString()}
              </p>
            </div>
          </div>
        </div>
        {/* <LectureCard
          lecture={course.lectures[selectedLecture]}
          handleNextLecture={handleNextLecture}
          handlePrevLecture={handlePrevLecture}
          lecturesCount={course.lectures.length}
        /> */}
        <button
          className="primary-button course-card-see-details-button"
          onClick={createSearchQuery}
        >
          See details
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
