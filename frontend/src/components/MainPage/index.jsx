import React from "react";
import {
  clearLocations,
  fetchLocations,
  getLocations,
} from "../../store/location";
import Footer from "../Footer";
import MapBox from "../MapBox";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { clearPhotos, fetchPhotosSplash } from "../../store/photos";
import LoadingSpinner from "../LoadingSpinner";

const MainPage = () => {
  const locations = useSelector(getLocations);
  const photos = useSelector((state) => Object.values(state.photos));
  const [currentImgIdx, setCurrentImgIdx] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLocations());
    return () => dispatch(clearLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPhotosSplash());
  }, [dispatch]);

  useEffect(() => {
    const backgroundInterval = setInterval(() => {
      if (photos && currentImgIdx < photos.length - 1) {
        setCurrentImgIdx(currentImgIdx + 1);
      } else {
        setCurrentImgIdx(0);
      }
    }, 3500);
    return () => clearInterval(backgroundInterval);
  }, [currentImgIdx]);

  useEffect(() => {
    return () => dispatch(clearPhotos());
  }, []);

  return (
    <>
      <div className="descriptions">
        <h1 className="app-title">The app for photographers to share and search for the best photography spots in California </h1>
        <p className="click-on-map">Click on any marker on the map to explore the best photography locations in that region!</p>
      </div>
      {locations.length ? (
        <>
          <div className="map-and-carousel-container">
            <div className="carousel">
              <div className="carousel-top">
                <img
                  src={photos[currentImgIdx]?.url}
                  className="image-one"
                ></img>
              </div>
              <div className="carousel-bottom">
                <img
                  src={photos[(currentImgIdx + 1) % photos.length]?.url}
                  className="image-two"
                ></img>
                <img
                  src={photos[(currentImgIdx + 2) % photos.length]?.url}
                  className="image-three"
                ></img>
              </div>
            </div>
            <div className="mainpage-mapbox">
              <MapBox locations={locations} />
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MainPage;
