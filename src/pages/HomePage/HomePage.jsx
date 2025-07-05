import React, { useEffect } from "react";
import "./HomePage.css";
import HomeIntro from "../../components/HomeIntro/HomeIntro";
import Sponsors from "../../components/Sponsors/Sponsors";
import Stats from "../../components/Stats/Stats";
import AboutHomePage from "../../components/AboutHomePage/AboutHomePage";
import WhatsNext from "../../components/WhatsNext/WhatsNext";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  const homeData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="home-page-container">
      <HomeIntro />
      <Stats />
      <Sponsors />
      <WhatsNext events={homeData} />
      <AboutHomePage />
    </div>
  );
}

export default HomePage;
