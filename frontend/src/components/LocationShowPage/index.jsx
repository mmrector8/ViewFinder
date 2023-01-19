import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, getLocation } from "../../store/location";
import "./LocationShowPage.css";
import { useParams } from "react-router-dom";
import MapBox from "../MapBox";

const LocationShowPage = () => {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const location = useSelector(getLocation(locationId));

  useEffect(() => {
    dispatch(fetchLocation(locationId));
  }, [dispatch]);

  return (
    <div className="location-show-main">
      <div className="location-header">
        <h1>{location?.county}</h1>
      </div>
      <div className="location-container">
        <div className="location-show-map-container">
          <MapBox spots={location?.spots} />
        </div>
        <div className="location-photo-grid">
          {/* <img
          className="location-images"
          src={location?.spots[1]?.photos[2]?.url}
        ></img> */}

          {/* {location?.spots?.map((spot, idx) => {
          spot?.photos?.map((photo, idx) => {
            {photo.url.includes(".jpg") &&
            <img
              src={photo.url}
              className="location-images"
              key={idx}
            ></img>;
        }});
        })} */}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, i) => (
            <img
              key={i}
              className="location-images"
              src="https://pinnacle-seeds.s3.us-west-1.amazonaws.com/athletic-training.jpg"
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationShowPage;
