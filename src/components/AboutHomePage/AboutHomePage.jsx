import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutHomePage.css";
import pyCoursePhoto from "../../assets/2023pycourse.jpg";

const AboutHomePage = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  const [isBetween, setIsBetween] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const bodyHeight = document.body.clientHeight;
      const viewportWidth = window.innerWidth;
      let startRange;

      if(viewportWidth-2 > 900){ //viewheight gets weird when it nears 900.
        startRange = bodyHeight - (1000+227);//227 is the height of the footer when its the viewheight is bigger than 900.
      }else if(viewportWidth-2 <= 900){
        startRange = bodyHeight - (900+427);//427 is the height of the footer when the viewheight is 900 or smaller. 
        //900 in caculation is 500px's of image card + 400pxs so that as soon as the user sees the top of the AboutHome it becomes
        //AboutHome scrolled.

        //TODO: make this dynamic.
      }


      if (scrollPosition >= startRange) {
        setIsBetween(true);
      } else {
        setIsBetween(false);
      }
      
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBetween]);

  const combinedClasses = `AboutHome ${isBetween ? "scrolled" : ""}`;

  return (
    <div className={combinedClasses}>
      <img src={pyCoursePhoto} alt="ReplaceImage" className="image" />
      <div className="overlay">
        <h2 className="header">Who are we?</h2>
        <p className="paragraph">
          ITU ACM Student Chapter is the largest computer science and software
          club at Istanbul Technical University. We provide students with
          opportunities to enhance their technical skills, build projects, and
          connect with the industry. Hosting prestigious events like AlgoComp,
          we also offer hackathons, technical workshops, and social activities
          to prepare students for both academic and professional success. Join
          the ITU ACM family and accelerate your growth as part of our vibrant
          community!
        </p>
        <button className="learn-more" onClick={handleLearnMore}>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutHomePage;
