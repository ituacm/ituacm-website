import React, { useEffect } from "react";
import "./AboutACM.css";
import roadmapPhoto from "../../assets/roadmap.png";
import pycoursePhoto from "../../assets/2023pycourse.jpg";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const AboutACM = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-page">
      <div className="top-section">
        <div className="top-section-left-part">
          <img
            src={roadmapPhoto}
            alt="AboutACM"
            className="top-section-left-part-image"
          />
        </div>

        <div className="top-section-right-part">
          <h3 className="top-section-right-part-header">
            About ITU ACM Student Chapter
          </h3>
          <p className="top-section-right-part-paragraph">
            ITU ACM Student Chapter is a student club founded under the Faculty
            of Computer and Informatics with the great support of our advisor
            Associate Professor Berk Canberk.Our mission is to unite the
            students who are interested in computer science and its fields. Our
            strategy is to form project and competition teams under special
            interest topics with the support of the academics for the growth of
            students’ technical skills together with social skills such as
            collaboration, communication and responsibility.
          </p>
        </div>
      </div>

      <div className="mid-section">
        <div className="mid-section-left-part">
          <h4 className="mid-section-left-part-header">About Us</h4>
        </div>
        <div className="mid-section-mid-part">
          <p className="mid-section-mid-part-paragraph">
            The Association for Computing Machinery (ACM) is the world’s largest
            computing society, uniting educators, researchers, and professionals
            to inspire dialogue, share resources, and tackle field challenges.
            ACM enhances the profession through leadership, high standards, and
            recognition of technical excellence. It supports members’ growth
            with opportunities for lifelong learning, career development, and
            networking. With nearly 100,000 members worldwide, ACM’s influence
            extends globally, with Councils in Europe, India, and China,
            fostering connections that highlight computing’s critical technical,
            educational, and social issues.
          </p>
        </div>
        <div className="mid-section-right-part"></div>
      </div>

      <div className="bot-section">
        <div className="bot-section-left-part">
          <div className="bot-section-left-part-content">
            <p className="bot-section-left-part-paragraph">
              No matter what your background or major is, we would love to have
              you at our events and activities! To keep up with what’s
              happening, we recommend checking out our events page. Here’s our
              social media, where you can see what we’re up to:
            </p>
            <div className="about-page-icons">
              <a
                href="https://www.instagram.com/ituacmsc/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/channel/UCCjjmsgFh5lRWhwoRH6p3tA"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://github.com/ituacm"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/company/ituacmsc/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/ituacmsc"
                target="_blank"
                rel="noreferrer"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="bot-section-right-part">
          <img
            src={pycoursePhoto}
            alt="OurMission"
            className="bot-section-right-part-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutACM;
