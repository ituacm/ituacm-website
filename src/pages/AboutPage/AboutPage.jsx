import React, { useEffect } from "react";
import "./AboutPage.css";
import { useLoaderData } from "react-router-dom";
import AboutACM from "../../components/AboutACM/AboutACM.jsx";
import Board from "../../components/Board/Board.jsx";

function AboutPage() {
  const data = useLoaderData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-container">
      <AboutACM />
      <Board boardData={data} />
    </div>
  );
}

export default AboutPage;
