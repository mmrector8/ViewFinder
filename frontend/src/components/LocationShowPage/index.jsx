import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, getLocations } from "../../store/location";
import ScrollImages from "./ScrollImages";
import "./LocationShowPage.css"


const LocationShowPage = () => {
    const dispatch = useDispatch();
    const locations = useSelector(getLocations)

    useEffect(() => {
        dispatch(fetchLocations())
    }, [dispatch])

    return(
        <div className="location-container">
            <div className="map-container">MAP</div>

            <div className="location-photo-grid">
                {/* {locations?.map((location, idx) => {
                    location.spots.photos[0]
                })} */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, i) => <img className="location-images" src="https://pinnacle-seeds.s3.us-west-1.amazonaws.com/athletic-training.jpg"></img>)}
            </div>
        </div>
    )
}

export default LocationShowPage;