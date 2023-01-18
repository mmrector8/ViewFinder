import React from "react";
import Footer from "../Footer";
import MapBox from "../MapBox";
import "./MainPage.css";

const MainPage = () => {
  return (
    <>
      <div className="map-and-carousel-container">
        <div className="carousel"></div>
        <div className="mainpage-mapbox">
          <MapBox />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
