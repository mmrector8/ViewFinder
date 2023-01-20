import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, getLocation } from "../../store/location";
import "./LocationShowPage.css";
import { useParams } from "react-router-dom";
import MapBox from "../MapBox";
import { openPhotoShowModal } from "../../store/ui";

const LocationShowPage = () => {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const location = useSelector(getLocation(locationId));
  const getPhotos = (state) => {
    const location = Object.values(state.locations)?.at(0)
    const spots = location?.spots
    const photosArr = []
   spots?.map((spot,i)=> photosArr.push(spot.photos))
  //  console.log(photosArr)
    return (photosArr.flat())
  };

  const photos = useSelector(getPhotos)

  useEffect(() => {
    dispatch(fetchLocation(locationId));
  }, [dispatch]);

  return (
    <>
      {location && (
        <div className="location-show-main">
          <div className="location-header">
            <h1>{location?.county}</h1>
          </div>
          <div className="location-container">
            <div className="location-show-map-container">
              <MapBox spots={location?.spots} />
            </div>
            <div className="location-photo-grid">
              {location.spots?.map((spot, idx) => (
                <img
                  src={spot?.photos[0]?.url}
                  alt="spot most liked photo"
                  key={idx}
                  className={`location-images`}
                onClick={()=> dispatch(openPhotoShowModal(spot?.photos[0]))}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationShowPage;
