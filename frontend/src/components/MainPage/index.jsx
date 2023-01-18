import React from "react";
import Footer from "../Footer";
import MapBox from "../MapBox";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
      <div className="map-and-carousel-container">
        <div className="carousel">
          <div className="info-sidebar"></div>
          <div className="carousel-top"></div>
          <div className="carousel-bottom-left"></div>
          <div className="carousel-bottom-right"></div>
        </div>
        <div className="mainpage-mapbox">
          <MapBox />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
