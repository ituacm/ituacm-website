import React from "react";
import "../Footer/Footer.css";
import whiteAcm from "../../assets/acm-white.png";
import acmWhite from "../../assets/ituacm-white.png";
import ituWhite from "../../assets/itu-white.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-left">
          <h2 className="footer-header"> Stay Tuned!</h2>
          <div className="footer-img">
            <a
              href="https://www.itu.edu.tr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ituWhite} id="ituWhite" alt="ITU Logo" />
            </a>
            <a
              href="https://www.acm.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={whiteAcm} id="acmWhite" alt="ACM Logo" />
            </a>
            <Link to={"https://ituacm.com"}>
              <img src={acmWhite} alt="ACM White" />{" "}
            </Link>
          </div>
        </div>

        <div className="footer-right">
          <h2 className="footer-header">Social Media Accounts</h2>

          <div className="footer-content">
            <div className="footer-icons">
              <a
                href="https://www.instagram.com/ituacmsc/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fa-brands fa-instagram"
                  aria-label="Instagram"
                ></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCCjjmsgFh5lRWhwoRH6p3tA"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-youtube" aria-label="YouTube"></i>
              </a>
              <a
                href="https://github.com/ituacm"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github" aria-label="GitHub"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/ituacmsc/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin" aria-label="LinkedIn"></i>
              </a>
              <a
                href="https://twitter.com/ituacmsc"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-twitter" aria-label="Twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ITU ACM Student Chapter, All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
