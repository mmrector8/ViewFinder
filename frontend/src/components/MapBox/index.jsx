import React, { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerClustererF,
} from "@react-google-maps/api";
import "./MapBox.css";
import CustomMarker from "./CustomMarker";
import LoadingSpinner from "../LoadingSpinner";

const MapBox = ({ locations, spots, center, zoom }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    // mapIds: ["73cef3161f877bcd"],
  });
  const options = {
    // mapId: "73cef3161f877bcd",
    mapTypeId: "terrain",
    disableDefaultUI: false,
    clickableIcons: false,
  };
  let innerCenter;
  if (center) {
    innerCenter = useMemo(() => (center), []);
  } else {
    innerCenter = useMemo(() => ({ lat: 37.1918, lng: -119.5249 }), []);
  }

  if (!isLoaded) return <LoadingSpinner />;
  return (
    <div className="map-component">
      <GoogleMap
        zoom={zoom ? zoom : 6}
        center={innerCenter}
        mapContainerClassName="map-container"
        options={options}
      >
        {/* <MarkerClustererF averageCenter enableRetinaIcons gridSize={60}> */}
        {/* {clusterer => */}
        {locations
          ? Object.values(locations).map((location, idx) => (
              <CustomMarker
                place={location}
                key={idx}
                type={"locations"}
                // clusterer={clusterer}
              />
            ))
          : spots?.map((spot, idx) => (
              <CustomMarker
                place={spot}
                key={idx}
                type={"spots"}
                // clusterer={clusterer}
              />
            ))}
        {/* </MarkerClustererF> */}
      </GoogleMap>
    </div>
  );
};

export default MapBox;
