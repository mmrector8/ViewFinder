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

    const options = {
        disableDefaultUI: true,
        mapTypeId: "terrain",
        zoomControl: true,
        rotateControl: true
    }
    const getCoordinates =(e)=>{
        setLatitude(e.latLng.lat())
        setLongitude(e.latLng.lng())
        setClicked(true);
    }

    const center = ({ lat: 37.1918, lng: -119.5249 })
    return (
        <>
        <GoogleMap 
            onClick={getCoordinates}
            zoom={4} 
            center={{ lat: 36.7783, lng: - 119.4179 }} 
            mapContainerClassName={'small-map-container'} 
            options={options}
        >
        {clicked ? 
            <Marker 
                position={{lat: lat, lng: lng}}
            /> 
            : 
        ""}
        {/* <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                    onClick={props.onMarkerClick}
                /> */}
        </GoogleMap>
        </>
    )
}

