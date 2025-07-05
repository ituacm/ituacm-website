import React, { useEffect, useState } from "react";
import { Typewriter, Cursor } from "react-simple-typewriter";
import "./HomeIntro.css";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function HomeIntro() {
  const [headerText, setHeaderText] = useState("");
  const text = "Welcome to ITU ACM!";
  const typingSpeed = 100;
  let index = 0;

  return (
    <div className="home-intro-container">
      <div className="home-intro-content">
        <h1 className="home-intro-header" translate="no">
          {"W"}
          <Typewriter words={["elcome to ITU ACM!"]} loop={1} typeSpeed={100} />
        </h1>
        <p className="home-intro-text">
          Your Place for Skill-Building Opportunities, Engaging Events, and
          Thrilling Tech Experiences in Istanbul Technical University
        </p>
        <ul className="home-intro-button-group">
          <li>
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/1w4bAkhqatXXPSXyMjv_jzYFv9eZU2h0hLvLjhFA2yVc/viewform?edit_requested=true"
            >
              <button
                className="primary-button home-intro-join-us-button"
                translate="no"
              >
                Join us now
              </button>
            </a>
          </li>
          <li>
            <Link to={"/contact"}>
              <button
                className="primary-button home-intro-join-us-button"
                translate="no"
              >
                Contact Us
              </button>
            </Link>
          </li>
        </ul>
        <ul className="home-intro-links">
          <li className="home-intro-link">
            <a href="https://www.instagram.com/ituacmsc/" target="_blank">
              <FaInstagram className="home-intro-link-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCCjjmsgFh5lRWhwoRH6p3tA"
              target="_blank"
            >
              <FaYoutube className="home-intro-link-icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/ituacm" target="_blank">
              <FaGithub className="home-intro-link-icon" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/ituacmsc" target="_blank">
              <FaLinkedin className="home-intro-link-icon" />
            </a>
          </li>
          <li>
            <a href="https://x.com/ituacmsc" target="_blank">
              <FaXTwitter className="home-intro-link-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomeIntro;
