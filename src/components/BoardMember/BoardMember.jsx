import React, { useState } from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaLink } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import "./BoardMember.css";

export default function BoardMember(props) {
  const { name, role, linkedin = null, email, photo, github } = props.member;

  const [showCopied, setShowCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 1200);
      })
      .catch((err) => console.error("Failed to copy!", err));
  };

  return (
    <div className="board-member">
      <img src={photo} alt={"notfound"} />
      <div className="board-member-info">
        <h1 className="board-member-name">{name}</h1>
        <h2 className="board-member-role">{role}</h2>
        <div className="board-member-social">
          {email ? (
            <div>
              {showCopied && (
                <span className="board-member-show-copied">
                  Copied to clipboard!
                </span>
              )}
              <FaLink className="board-member-icon" onClick={handleCopy} />
            </div>
          ) : null}
          {github ? (
            <a href={github} target="_blank">
              <FaGithub className="board-member-icon" />
            </a>
          ) : null}
          {linkedin ? (
            <a href={linkedin} target="_blank">
              <AiFillLinkedin className="board-member-icon" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
