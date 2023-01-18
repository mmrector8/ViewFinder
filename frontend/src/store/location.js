

export const RECEIVE_LOCATION = "locations/RECEIVE_LOCATION"
export const RECEIVE_LOCATIONS = "locations/RECEIVE_LOCATIONS"

export const receiveLocation = (location) => ({
    type: RECEIVE_LOCATION,
    location
})

export const receiveLocations = (locations) => ({
    type: RECEIVE_LOCATIONS,
    locations
})

export const getLocation = (locationId) => store => {
    if (store.locations) {
        return store.locations[locationId]
    } else {
        return null
    }
}

export const getLocations = (store) => {
    if (store.locations){
        return Object.values(store.locations)
    } else {
        return []
    }
}

export const fetchLocations = () => async (dispatch) => {
    let res = await fetch("/api/locations");
    if (res.ok) {
        let locations = await res.json();
        dispatch(receiveLocations(locations))
    }
}

export const fetchLocation = (locationId) => async (dispatch) => {
    let res = await fetch(`/api/locations/${locationId}`)
    if (res.ok) {
        let location = await res.json();
        dispatch(receiveLocation(location))
    }
}

const locationReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type) {
        case RECEIVE_LOCATION:
            newState[action.location.id] = action.location;
        case RECEIVE_LOCATIONS:
            return {...newState, ...action.locations};
        default: 
            return state;    
    }
}

export default locationReducer;