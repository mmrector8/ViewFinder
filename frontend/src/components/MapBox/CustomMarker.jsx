import React from "react";
import { MarkerF } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";

const CustomMarker = ({ place, type, clusterer }) => {
  const history = useHistory();

  return (
    <MarkerF
      position={{ lat: place?.latitude, lng: place?.longitude }}
      animation={2}
      title={type === "locations" ? place.county : place.name}
      onClick={() => history.push(`/${type}/${place._id}`)}
      // clusterer={clusterer}
    />
  );
};

export default CustomMarker;
