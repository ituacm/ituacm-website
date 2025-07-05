import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import "./BoardMembersDashboard.css";

function BoardMembersDashboard() {
  const boardMembers = useLoaderData();

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
            key={member.id}
            to={member.id}
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
