import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import "./BoardMembersDashboard.css";

function BoardMembersDashboard() {
  const boardMembers = useLoaderData() || [];

  console.log(boardMembers);

  return (
    <div className="board-members-dashboard-container">
      <div className="board-members-dashboard-list">
        <Link
          to="new"
          className="board-members-dashboard-element board-members-dashboard-create"
        >
          Add New Board Member
        </Link>
        {boardMembers.map((member) => (
          <Link
            key={member._id}
            to={member._id}
            className="board-members-dashboard-element"
          >
            <div className="board-members-dashboard-title">
              {member.name} - {member.role}
            </div>
            <div className="board-members-dashboard-description">
              {member.description}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BoardMembersDashboard;
