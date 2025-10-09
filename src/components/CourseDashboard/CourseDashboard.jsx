import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDashboard.css";
import { supabase } from "../../api/supabaseClient";

function CourseDashboard() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const courseRef = useRef(null);
  const [isCreateMode, setIsCreateMode] = useState(courseId === "new");

  useEffect(() => {
    if (!isCreateMode) {
      const fetchCourse = async () => {
        try {
          const { data, error } = await supabase
            .from("courses")
            .select("*")
            .eq("id", courseId)
            .single();
          if (error) throw error;
          setCourse(data);
          courseRef.current = { ...data };
          // Fetch lectures for this course
          const { data: lecturesData, error: lecturesError } = await supabase
            .from("lectures")
            .select("*")
            .eq("courseId", courseId)
            .order("lectureNumber", { ascending: true });
          if (lecturesError) throw lecturesError;
          setLectures(lecturesData || []);
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
        registrationLink: "",
      };
      setCourse(courseRef.current);
      setLectures([]);
    }
  }, [courseId, isCreateMode]);

  const handleLectureChange = (index, field, value) => {
    const newLectures = [...lectures];
    newLectures[index][field] = value;
    setLectures(newLectures);
  };

  const handleDeleteLecture = (index) => {
    const newLectures = [...lectures];
    newLectures.splice(index, 1);
    setLectures(newLectures);
  };

  const handleAddLecture = () => {
    const newLecture = {
      lectureNumber: lectures.length + 1,
      subject: "",
      start: "",
      end: "",
      location: "",
      instructors: "",
    };
    setLectures([...lectures, newLecture]);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await supabase.from('courses').delete().eq('id', courseId);
        await supabase.from('lectures').delete().eq('courseId', courseId);
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

    const { image, newImageFile, ...courseData } = courseRef.current;
    let imageUrl = image;
    let oldImageFileName;

    // Extract old image file name if it is a Supabase Storage URL
    if (image && image.includes('course-images')) {
      const parts = image.split('/');
      const idx = parts.findIndex(p => p === 'course-images');
      if (idx !== -1 && parts.length > idx + 1) {
        oldImageFileName = parts.slice(idx + 1).join('/');
      }
    }

    // Upload new image if selected
    if (newImageFile) {
      const fileExt = newImageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('course-images')
        .upload(fileName, newImageFile, {
          cacheControl: '3600',
          upsert: false,
        });
      if (uploadError) {
        console.error('Image upload error:', uploadError);
        alert('Görsel yüklenemedi.');
        return;
      }
      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('course-images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
      // Delete old image if exists
      if (oldImageFileName) {
        await supabase.storage.from('course-images').remove([oldImageFileName]);
      }
    }

    // Prepare course payload (no lectures)
    const coursePayload = {
      ...courseData,
      image: imageUrl,
    };

    try {
      let result;
      let course_id = courseId;
      if (isCreateMode) {
        result = await supabase.from('courses').insert([coursePayload]).select().single();
        console.log('Supabase insert result:', result);
        if (result.error) {
          console.error('Supabase error:', result.error, result);
          throw result.error;
        }
        course_id = result.data.id;
        alert('Course created successfully!');
      } else {
        result = await supabase.from('courses').update(coursePayload).eq('id', courseId);
        console.log('Supabase update result:', result);
        if (result.error) {
          console.error('Supabase error:', result.error, result);
          throw result.error;
        }
        // Sil eski lectures
        await supabase.from('lectures').delete().eq('courseId', courseId);
        course_id = courseId;
        alert('Course updated successfully!');
      }
      // Insert all lectures with courseId
      if (lectures.length > 0) {
        const lecturesWithCourseId = lectures.map((l, idx) => ({ ...l, courseId: course_id, lectureNumber: idx + 1 }));
        const { error: lecturesError } = await supabase.from('lectures').insert(lecturesWithCourseId);
        if (lecturesError) {
          console.error('Lectures insert error:', lecturesError);
          alert('Lectures could not be saved!');
        }
      }
      navigate(-1);
    } catch (error) {
      console.error('Error saving course:', error, JSON.stringify(error, null, 2));
      alert(`Failed to ${isCreateMode ? 'create' : 'update'} course.\n${error?.message || JSON.stringify(error)}`);
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

            <label className="course-dashboard-form-label">
              Registration Link:
              <input
                className="course-dashboard-form-input"
                type="url"
                placeholder="https://example.com/register"
                defaultValue={courseRef.current.registrationLink || ""}
                onChange={(e) => (courseRef.current.registrationLink = e.target.value)}
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
            {lectures.map((lecture, index) => (
              <div key={index} className="course-dashboard-lecture">
                <div className="course-dashboard-lecture-title">
                  Lecture {lecture.lectureNumber}: {lecture.subject || "Untitled Lecture"}
                </div>
                <div className="course-dashboard-lecture-section">
                  <div className="course-dashboard-lecture-section-title">
                    Subject
                  </div>
                  <input
                    type="text"
                    placeholder="Enter subject*"
                    value={lecture.subject}
                    onChange={(e) => handleLectureChange(index, "subject", e.target.value)}
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
                    onChange={(e) => handleLectureChange(index, "location", e.target.value)}
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
                    onChange={(e) => handleLectureChange(index, "instructors", e.target.value)}
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
                    onChange={(e) => handleLectureChange(index, "start", e.target.value)}
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
                    onChange={(e) => handleLectureChange(index, "end", e.target.value)}
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
