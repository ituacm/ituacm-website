import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/auth";
import "./AdminDashboard.css";

function AdminDashboard() {
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-grid">
        <Link to="events" className="admin-dashboard-card">
          <h2 className="admin-dashboard-card-title">
            <svg
              className="admin-dashboard-card-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Events
          </h2>
          <p className="admin-dashboard-card-description">
            Manage upcoming events, create new events, and edit existing ones.
          </p>
        </Link>

        <Link to="courses" className="admin-dashboard-card">
          <h2 className="admin-dashboard-card-title">
            <svg
              className="admin-dashboard-card-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Courses
          </h2>
          <p className="admin-dashboard-card-description">
            Manage course offerings, create new courses, and update existing
            ones.
          </p>
        </Link>

        <Link to="board-members" className="admin-dashboard-card">
          <h2 className="admin-dashboard-card-title">
            <svg
              className="admin-dashboard-card-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Board Members
          </h2>
          <p className="admin-dashboard-card-description">
            Manage board member profiles.
          </p>
        </Link>
      </div>
      <button className="admin-dashboard-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
