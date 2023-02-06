import React, {useEffect, useMemo, useState} from 'react';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import LoadingSpinner from '../LoadingSpinner';
import * as mapcss from "./mapinput.css"

const SmallMapWrapper = ({setLatitude, setLongitude, lat, lng}) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    })
    if (!isLoaded) {
        return <LoadingSpinner />
    }
    return (
        <>
            <div className="small-map-component">
                <SmallMap setLatitude={setLatitude} setLongitude={setLongitude} lat={lat} lng={lng} />
            </div>
        </>
    )
}
export default SmallMapWrapper;

export const SmallMap = ({ setLatitude, setLongitude, lat, lng }) => {
    const [clicked, setClicked] = useState(false)
    const [center, setCenter] = useState({ lat: 37.1918, lng: -119.5249 })
    const options = {
        disableDefaultUI: true,
        mapTypeId: "terrain",
        zoomControl: true,
        rotateControl: true,
        draggable: true
    }
    const getCoordinates =(e)=>{
      const geocoder = new google.maps.Geocoder();
      const latlng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };

   geocoder
     .geocode({ location: latlng })
     .then((response) => {
       if (response.results[0]) {
         const address = response.results[0].formatted_address
         if(address.includes("CA") || address.includes("California")){
            setLatitude(e.latLng.lat());
            setLongitude(e.latLng.lng());
            setClicked(true);
            setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
         } else {
            window.alert("Must stay in California")
         }
       } else {
         window.alert("No results found");
       }
     })
     .catch((e) => window.alert("Geocoder failed due to: " + e));

    
    }

    useEffect(()=>{
        if(lat === "" || lng ===""){
            setClicked(false);
            setCenter({ lat: 37.1918, lng: -119.5249 })
        }
    }, [lat, lng])

    return (
        <>
        <GoogleMap 
            onClick={getCoordinates}
            zoom={clicked ? 8 : 5} 
            center={center} 
            mapContainerClassName={'small-map-container'} 
            options={options}
        >
        {clicked ? 
            <MarkerF
                position={{lat: lat, lng: lng}}
            /> 
            : 
        ""}
        </GoogleMap>
        </>
    )
}

