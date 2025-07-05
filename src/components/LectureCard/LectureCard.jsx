import React from "react";
import "./LectureCard.css";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { IoCalendarSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

function LectureCard({ lecture }) {
  return (
    <div className="lecture-card-container">
      <div className="lecture">
        <div className="lecture-top">
          <h2 className="lecture-number">
            {"Lecture " + lecture.lectureNumber}
          </h2>
          <h2 className="lecture-subject">{lecture.subject}</h2>
        </div>
        <div className="lecture-bottom">
          <div className="lecture-detail-section">
            <IoCalendarSharp className="course-card-icon" />
            <p>{lecture.start.toDateString()}</p>
          </div>
          <div className="lecture-detail-section">
            <FaRegClock className="lecture-icon" />
            <p>{(lecture.end - lecture.start) / (1000 * 60 * 60) + " hours"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LectureCard;
