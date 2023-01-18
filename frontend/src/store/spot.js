import jwtFetch from "./jwt";

export const RECEIVE_SPOT = "spots/RECEIEVE_SPOT"

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const fetchSpot = (spotId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/spots/${spotId}`)
        const spot = await res.json()
        dispatch(receiveSpot(spot))
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
    }
}

const spotsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_SPOT:
            return { ...action.spot }
        default:
            return state;
    }
}
export default spotsReducer;