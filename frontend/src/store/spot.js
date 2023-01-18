import jwtFetch from "./jwt";

export const RECEIVE_SPOT = "spots/RECEIEVE_SPOT"
const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const receiveNewComment = (comment) => {
    console.log("hitting receive new comment", comment)
    return {
        type: RECEIVE_NEW_COMMENT,
        comment
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
});

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

export const createComment = data => async dispatch => {
    try {
        console.log('hitting try')
        const res = await jwtFetch(`/api/comments/spots/${data.spotId}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const comment = await res.json();
        console.log(comment, "create comment comment")
        dispatch(receiveNewComment(comment));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

const spotsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_SPOT:
            return { ...action.spot }
        case RECEIVE_NEW_COMMENT:
            newState.comments.push(action.comment)
            return newState;
        default:
            return state;
    }
}
export default spotsReducer;