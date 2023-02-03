import React, {useMemo} from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
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

    const options = {
        disableDefaultUI: true,
        mapTypeId: "terrain",
        zoomControl: true,
        rotateControl: true
    }
    const getCoordinates =(e)=>{
        // console.log(e.latLng.lat())
        // console.log(e.ltLng.lng())
        setLatitude(e.latLng.lat())
        setLongitude(e.latLng.lng())
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
        </GoogleMap>
        </>
    )
}

