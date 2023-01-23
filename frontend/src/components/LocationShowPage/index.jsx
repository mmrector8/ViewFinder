import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocation, getLocation } from "../../store/location";
import "./LocationShowPage.css";
import { useParams } from "react-router-dom";
import MapBox from "../MapBox";
import { openPhotoShowModal } from "../../store/ui";
import LoadingSpinner from "../LoadingSpinner";
import { fetchLocationSpots } from "../../store/spot";

const PhotoGridView = (spots) => {
  const spotsArray = Object.values(spots)[0];
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  let photosToShow = spotsArray
    ?.map((spot) => {
      if (spot?.photos && spot?.photos?.length) {
        return spot?.photos[0];
      }
      return null;
    })
    .filter((photo) => photo != null);

  if (!photosToShow.length) {
    return (
      <h1 className="no-photos-container">
        No images for this spot! Be the first to add one!
      </h1>
    );
  }
  return (
    <div className="location-photo-grid">
      {photosToShow.map((photo, idx) => (
        <div
          key={idx}
          width="280px"
          className="user-photo-container"
          onClick={() => dispatch(openPhotoShowModal(photo))}
        >
          <p
            className="overlay-photo-text-user"
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()}
          >
            {photo.description} <br /> -{photo.userId?.username}
          </p>
          <img
            src={photo.url}
            alt="spot most liked photo"
            className="location-images"
            onMouseEnter={() => setIsHovered(photo._id)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      ))}
    </div>
  );
};

const LocationShowPage = () => {
  const { locationId } = useParams();
  const dispatch = useDispatch();
  const location = useSelector(getLocation(locationId));
  const spots = useSelector((store) => Object.values(store.spots));

  useEffect(() => {
    dispatch(fetchLocation(locationId));
    dispatch(fetchLocationSpots(locationId));
  }, [dispatch]);

  return (
    <>
      {location ? (
        <div className="location-show-main">
          <div className="location-header">
            <h1>{location.county}</h1>
          </div>
          <div className="location-container">
              <div className="location-show-map-container">
                <MapBox
                  spots={spots}
                  center={{ lat: location?.latitude, lng: location?.longitude }}
                  zoom={9}
                />
              </div>
            <PhotoGridView spots={spots} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default LocationShowPage;
