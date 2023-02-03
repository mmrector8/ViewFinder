import React, {useMemo, useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
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
        setLatitude(e.latLng.lat())
        setLongitude(e.latLng.lng())
        setClicked(true);
        console.log(lat, lng)
        setCenter({lat: e.latLng.lat(), lng: e.latLng.lng()})
    }

    // const center = ({ lat: 37.1918, lng: -119.5249 })

    return (
        <>
        <GoogleMap 
            onClick={getCoordinates}
            zoom={clicked ? 10 : 5} 
            center={center} 
            mapContainerClassName={'small-map-container'} 
            options={options}
        >
        {clicked ? 
            <Marker 
                position={{lat: lat, lng: lng}}
            /> 
            : 
        ""}
        </GoogleMap>
        </>
    )
}

