import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardMemberDashboard.css";
import { supabase } from "../../api/supabaseClient";

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
          const { data, error } = await supabase
            .from("board_members")
            .select("*")
            .eq("id", boardMemberId)
            .single();
          if (error) throw error;
          setMember(data);
          memberRef.current = { ...data };
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
        grade: 0,
        photo: "",
      };
      setMember(memberRef.current);
    }
  }, [boardMemberId, isCreateMode]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this board member?")) {
      try {
        await supabase.from('board_members').delete().eq('id', boardMemberId);
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

    const { photo, newImageFile, ...memberData } = memberRef.current;
    let photoUrl = photo;
    let oldPhotoFileName;

    // Extract old photo file name if it is a Supabase Storage URL
    if (photo && photo.includes('boardmember-images')) {
      const parts = photo.split('/');
      const idx = parts.findIndex(p => p === 'boardmember-images');
      if (idx !== -1 && parts.length > idx + 1) {
        oldPhotoFileName = parts.slice(idx + 1).join('/');
      }
    }

    // Upload new image if selected
    if (newImageFile) {
      const fileExt = newImageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('boardmember-images')
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
      const { data: publicUrlData } = supabase.storage.from('boardmember-images').getPublicUrl(fileName);
      photoUrl = publicUrlData.publicUrl;
      // Delete old photo if exists
      if (oldPhotoFileName) {
        await supabase.storage.from('boardmember-images').remove([oldPhotoFileName]);
      }
    }

    // Prepare member payload
    const memberPayload = {
      ...memberData,
      photo: photoUrl,
    };

    try {
      let result;
      if (isCreateMode) {
        result = await supabase.from('board_members').insert([memberPayload]);
        console.log('Supabase insert result:', result);
        if (result.error) {
          console.error('Supabase error:', result.error, result);
          throw result.error;
        }
        alert('Board member created successfully!');
      } else {
        result = await supabase.from('board_members').update(memberPayload).eq('id', boardMemberId);
        console.log('Supabase update result:', result);
        if (result.error) {
          console.error('Supabase error:', result.error, result);
          throw result.error;
        }
        alert('Board member updated successfully!');
      }
      navigate(-1);
    } catch (error) {
      console.error('Error saving board member:', error, JSON.stringify(error, null, 2));
      alert(`Failed to ${isCreateMode ? 'create' : 'update'} board member.\n${error?.message || JSON.stringify(error)}`);
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
                      memberRef.current.photo
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
