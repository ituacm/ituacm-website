import React from "react";
import "./Stats.css";
import { IoPeopleOutline } from "react-icons/io5";
import { PiBracketsCurlyBold } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";

function Stats() {
  return (
    <div className="stats-container">
      <div className="stats">
        <div className="stat">
          <IoPeopleOutline className="stat-icon" />

          <h2 className="stat-detail">100+ Active Members</h2>
        </div>
        <div className="stat">
          <FaHandshake className="stat-icon" />

          <h2 className="stat-detail">20+ Sponsors</h2>
        </div>
        <div className="stat">
          <PiBracketsCurlyBold className="stat-icon" />

          <h2 className="stat-detail">2 Technical Squads</h2>
        </div>
      </div>
    </div>
  );
}

export default Stats;
