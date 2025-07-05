import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDashboard.css";

function CourseDashboard() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const courseRef = useRef(null);
  const [isCreateMode, setIsCreateMode] = useState(courseId === "new");

  useEffect(() => {
    if (!isCreateMode) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/courses/${courseId}`
          );
          setCourse(response.data);
          courseRef.current = { ...response.data };
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      };

      fetchCourse();
    } else {
      // Initialize empty course for create mode
      courseRef.current = {
        title: "",
        description: "",
        content: "",
        image: "",
        lectures: [],
      };
      setCourse(courseRef.current);
    }
  }, [courseId, isCreateMode]);

  const handleLectureChange = (index, field, value) => {
    courseRef.current.lectures[index][field] = value;
    setCourse({ ...courseRef.current });
  };

  const handleDeleteLecture = (index) => {
    courseRef.current.lectures.splice(index, 1);
    setCourse({ ...courseRef.current });
  };

  const handleAddLecture = () => {
    const newLecture = {
      lectureNumber: courseRef.current.lectures.length + 1,
      subject: "",
      start: "",
      end: "",
      location: "",
      instructors: "",
    };
    courseRef.current.lectures.push(newLecture);
    setCourse({ ...courseRef.current });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8080/courses/${courseId}`);
        alert("Course deleted successfully!");
        navigate("/courses");
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // General course fields
    const formData = new FormData();
    const { _id, __v, image, lectures, newImageFile, ...courseData } =
      courseRef.current;

    // Print courseRef for debugging
    console.log("courseRef:", courseRef.current);

    Object.keys(courseData).forEach((key) => {
      formData.append(key, courseData[key]);
    });

    if (newImageFile) {
      formData.append("photo", courseRef.current.newImageFile);
    }

    // Lectures
    formData.append("lectures", JSON.stringify(lectures));

    // Print form data for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      if (isCreateMode) {
        await axios.post("http://localhost:8080/courses", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Course created successfully!");
      } else {
        await axios.put(`http://localhost:8080/courses/${courseId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Course updated successfully!");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error saving course:", error);
      alert(`Failed to ${isCreateMode ? "create" : "update"} course.`);
    }
  };

  return (
    <div className="course-dashboard-container">
      {course ? (
        <div className="course-dashboard-form-wrapper">
          <h2 className="course-dashboard-title">
            {isCreateMode ? "Create New Course" : "Edit Course"}
          </h2>
          <form className="course-dashboard-form" onSubmit={handleSubmit}>
            <label className="course-dashboard-form-label">
              Title*:
              <input
                className="course-dashboard-form-input"
                type="text"
                defaultValue={courseRef.current.title}
                onChange={(e) => (courseRef.current.title = e.target.value)}
                required
              />
            </label>

            <label className="course-dashboard-form-label">
              Description*:
              <textarea
                className="course-dashboard-form-textarea"
                defaultValue={courseRef.current.description}
                onChange={(e) =>
                  (courseRef.current.description = e.target.value)
                }
                required
              />
            </label>

            <label className="course-dashboard-form-label">
              Content*:
              <textarea
                className="course-dashboard-form-textarea"
                defaultValue={courseRef.current.content}
                onChange={(e) => (courseRef.current.content = e.target.value)}
                required
              />
            </label>

            {!isCreateMode && (
              <label className="course-dashboard-form-label">
                Current Course Image:
                <div className="course-dashboard-image-preview">
                  <img
                    src={
                      courseRef.current.image?.startsWith("http")
                        ? courseRef.current.image
                        : `http://localhost:8080/media/${courseRef.current.image}`
                    }
                    alt="Course"
                    className="course-dashboard-image"
                  />
                </div>
              </label>
            )}

            <label className="course-dashboard-form-label">
              {isCreateMode ? "Upload Course Image*:" : "Upload New Image:"}
              <input
                className="course-dashboard-form-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    courseRef.current.newImageFile = file;
                  }
                }}
                required={isCreateMode}
              />
            </label>

            <hr />
            <h3>Lectures</h3>
            {courseRef.current.lectures.map((lecture, index) => (
              <div key={index} className="course-dashboard-lecture">
                <div className="course-dashboard-lecture-title">
                  Lecture {lecture.lectureNumber}:{" "}
                  {lecture.subject || "Untitled Lecture"}
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    Subject
                  </div>
                  <input
                    type="text"
                    placeholder="Enter subject*"
                    value={lecture.subject}
                    onChange={(e) =>
                      handleLectureChange(index, "subject", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    Location
                  </div>
                  <input
                    type="text"
                    placeholder="Enter location*"
                    value={lecture.location}
                    onChange={(e) =>
                      handleLectureChange(index, "location", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    Instructors
                  </div>
                  <input
                    type="text"
                    placeholder="Enter instructors*"
                    value={lecture.instructors}
                    onChange={(e) =>
                      handleLectureChange(index, "instructors", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    Start Time
                  </div>
                  <input
                    type="datetime-local"
                    value={lecture.start ? lecture.start.slice(0, 16) : ""}
                    onChange={(e) =>
                      handleLectureChange(index, "start", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    End Time
                  </div>
                  <input
                    type="datetime-local"
                    value={lecture.end ? lecture.end.slice(0, 16) : ""}
                    onChange={(e) =>
                      handleLectureChange(index, "end", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  className="course-dashboard-delete-button"
                  onClick={() => handleDeleteLecture(index)}
                >
                  Delete Lecture
                </button>
                <hr />
              </div>
            ))}
            <button
              type="button"
              className="course-dashboard-add-button"
              onClick={handleAddLecture}
            >
              Add Lecture
            </button>
          </form>
        </div>
      ) : (
        <p className="course-dashboard-loading-message">Loading...</p>
      )}
      <div className="course-dashboard-buttons">
        <button
          className="course-dashboard-form-submit-button"
          onClick={handleSubmit}
        >
          {isCreateMode ? "Create" : "Save"}
        </button>
        <button
          className="course-dashboard-back-button"
          onClick={() => navigate("/courses")}
        >
          Back
        </button>

        {!isCreateMode && (
          <button
            className="course-dashboard-delete-button"
            onClick={handleDelete}
          >
            Delete Course
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseDashboard;
