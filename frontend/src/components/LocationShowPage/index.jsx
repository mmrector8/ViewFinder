import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, getLocation } from "../../store/location";
import "./LocationShowPage.css"
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
    <div className="location-container">
      <div className="location-show-map-container">
        <MapBox spots={location?.spots} />
      </div>
      <div className="location-photo-grid">
        {/* {locations?.map((location, idx) => {
                    location.spots.photos[0]
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
  );
};

export default LocationShowPage;
