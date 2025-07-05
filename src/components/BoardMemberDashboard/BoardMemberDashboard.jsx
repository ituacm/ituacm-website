import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardMemberDashboard.css";

function BoardMemberDashboard() {
  const { boardMemberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const memberRef = useRef(null);
  const [isCreateMode, setIsCreateMode] = useState(boardMemberId === "new");

  useEffect(() => {
    if (!isCreateMode) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/boardMembers/${boardMemberId}`
          );
          setMember(response.data);
          memberRef.current = { ...response.data };
        } catch (error) {
          console.error("Error fetching member data:", error);
        }
      };

      fetchMember();
    } else {
      // Initialize empty member for create mode
      memberRef.current = {
        name: "",
        role: "",
        github: "",
        linkedin: "",
        email: "",
        grade: 1,
        photo: "",
      };
      setMember(memberRef.current);
    }
  }, [boardMemberId, isCreateMode]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this board member?")) {
      try {
        await axios.delete(
          `http://localhost:8080/boardMembers/${boardMemberId}`
        );
        alert("Board member deleted successfully!");
        navigate(-1);
      } catch (error) {
        console.error("Error deleting board member:", error);
        alert("Failed to delete board member.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // General member fields
    const formData = new FormData();
    const { _id, __v, image, newImageFile, ...memberData } = memberRef.current;

    Object.keys(memberData).forEach((key) => {
      formData.append(key, memberData[key]);
    });

    if (newImageFile) {
      formData.append("photo", newImageFile);
    }

    try {
      if (isCreateMode) {
        await axios.post("http://localhost:8080/boardMembers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Board member created successfully!");
      } else {
        await axios.put(
          `http://localhost:8080/boardMembers/${boardMemberId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Board member updated successfully!");
      }
      navigate(-1);
    } catch (error) {
      console.error("Error saving board member:", error);
      alert(`Failed to ${isCreateMode ? "create" : "update"} board member.`);
    }
  };

  return (
    <div className="board-member-dashboard-container">
      {member ? (
        <div className="board-member-dashboard-form-wrapper">
          <h2 className="board-member-dashboard-title">
            {isCreateMode ? "Create New Board Member" : "Edit Board Member"}
          </h2>
          <form className="board-member-dashboard-form" onSubmit={handleSubmit}>
            <label className="board-member-dashboard-form-label">
              Name*:
              <input
                className="board-member-dashboard-form-input"
                type="text"
                defaultValue={memberRef.current.name}
                onChange={(e) => (memberRef.current.name = e.target.value)}
                required
              />
            </label>

            <label className="board-member-dashboard-form-label">
              Role*:
              <input
                className="board-member-dashboard-form-input"
                type="text"
                defaultValue={memberRef.current.role}
                onChange={(e) => (memberRef.current.role = e.target.value)}
                required
              />
            </label>

            <label className="board-member-dashboard-form-label">
              GitHub URL:
              <input
                className="board-member-dashboard-form-input"
                type="url"
                defaultValue={memberRef.current.github}
                onChange={(e) => (memberRef.current.github = e.target.value)}
                placeholder="https://github.com/username"
              />
            </label>

            <label className="board-member-dashboard-form-label">
              LinkedIn URL:
              <input
                className="board-member-dashboard-form-input"
                type="url"
                defaultValue={memberRef.current.linkedin}
                onChange={(e) => (memberRef.current.linkedin = e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </label>

            <label className="board-member-dashboard-form-label">
              Email*:
              <input
                className="board-member-dashboard-form-input"
                type="email"
                defaultValue={memberRef.current.email}
                onChange={(e) => (memberRef.current.email = e.target.value)}
                required
                placeholder="example@itu.acm.org"
              />
            </label>

            <label className="board-member-dashboard-form-label">
              Grade*:
              <input
                className="board-member-dashboard-form-input"
                type="number"
                min="1"
                max="4"
                defaultValue={memberRef.current.grade}
                onChange={(e) =>
                  (memberRef.current.grade = parseInt(e.target.value))
                }
                required
              />
            </label>

            {!isCreateMode && memberRef.current.photo && (
              <label className="board-member-dashboard-form-label">
                Current Image:
                <div className="board-member-dashboard-image-preview">
                  <img
                    src={
                      memberRef.current.photo?.startsWith("http")
                        ? memberRef.current.photo
                        : `http://localhost:8080/media/${memberRef.current.photo}`
                    }
                    alt="Board Member"
                    className="board-member-dashboard-image"
                  />
                </div>
              </label>
            )}

            <label className="board-member-dashboard-form-label">
              {isCreateMode ? "Upload Image*:" : "Upload New Image:"}
              <input
                className="board-member-dashboard-form-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    memberRef.current.newImageFile = file;
                  }
                }}
                required={isCreateMode}
              />
            </label>
          </form>
        </div>
      ) : (
        <p className="board-member-dashboard-loading-message">Loading...</p>
      )}
      <div className="board-member-dashboard-buttons">
        <button
          className="board-member-dashboard-back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="board-member-dashboard-form-submit-button"
          onClick={handleSubmit}
        >
          {isCreateMode ? "Create" : "Save"}
        </button>
        {!isCreateMode && (
          <button
            className="board-member-dashboard-delete-button"
            onClick={handleDelete}
          >
            Delete Board Member
          </button>
        )}
      </div>
    </div>
  );
}

export default BoardMemberDashboard;
