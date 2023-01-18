import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
import "./MapBox.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-119.5249);
  const [lat, setLat] = useState(38.1918);
  const [zoom, setZoom] = useState(4.55);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="map-component">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default MapBox;
