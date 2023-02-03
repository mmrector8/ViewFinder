import React, {useMemo} from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import LoadingSpinner from '../LoadingSpinner';
import * as mapcss from "./mapinput.css"

const SmallMapWrapper = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    })
    if (!isLoaded) {
        return <LoadingSpinner />
    }
    return (
        <>
            <div className="small-map-component">
                <SmallMap />
            </div>
        </>
    )
}
export default SmallMapWrapper;

export const SmallMap = () => {

    const options = {
        mapTypeId: "terrain",
        zoomControl: true,
        rotateControl: true
    }
    const center = ({ lat: 37.1918, lng: -119.5249 })
    return (
        <GoogleMap 
            zoom={10} 
            center={{ lat: 37.1918, lng: -119.5249 }} 
            mapContainerClassName={'small-map-container'} 
            options={options}
        >
        </GoogleMap>
    )
}

