import jwtFetch from "./jwt";
import { RECEIVE_PHOTO, receivePhoto, createPhoto, REMOVE_PHOTO, removePhoto, deletePhoto  } from "./photos";
export const RECEIVE_SPOT = "spots/RECEIEVE_SPOT"
const RECEIVE_NEW_COMMENT = "comments/RECEIVE_NEW_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT"
const RECEIVE_COMMENT_ERRORS = "comments/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "comments/CLEAR_COMMENT_ERRORS";
const CLEAR_SPOTS = "comments/CLEAR_SPOTS";
const PATCH_COMMENT = "comments/PATCH_COMMENT"

export const receiveSpot = spot => ({
    type: RECEIVE_SPOT,
    spot
})

export const clearSpots = ()=>{
    return {
        type: CLEAR_SPOTS
    }
}

export const receiveNewComment = (comment) => {
    return {
        type: RECEIVE_NEW_COMMENT,
        comment
    }
}

export const patchComment = (comment) => {
    return {
        type: PATCH_COMMENT,
        comment
    }
}

export const removeComment = (commentId) =>{
    return {
        type: DELETE_COMMENT,
        commentId
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
        const res = await jwtFetch(`/api/comments/spots/${data.spotId}`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const comment = await res.json();
        dispatch(receiveNewComment(comment));  
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveErrors(resBody.errors));
        }
    }
};

export const updateComment = commentI => async dispatch => {
     console.log(commentI)
    // try {
        const res = await jwtFetch(`/api/comments/${commentI._id}`, {
            method: 'PATCH',
            body: JSON.stringify(commentI)
        });
        const comment = await res.json();
        dispatch(patchComment(comment));
    // } catch (err) {
    //     const resBody = await err.json();
    //     if (resBody.statusCode === 400) {
    //         return dispatch(receiveErrors(resBody.errors));
    //     }
    // }
};

export const deleteComment = (commentId) => async dispatch => {
       const res = await jwtFetch(`/api/comments/${commentId}`, {
           method: "DELETE"
       })
       if(res.ok){
           dispatch(removeComment(commentId))
       }   
}


const spotsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_SPOT:
            return { ...action.spot }
        case RECEIVE_NEW_COMMENT:
            newState.comments.push(action.comment)
            return newState;
        case RECEIVE_PHOTO:
            newState.photos.push(action.photo)
            return newState;
        case REMOVE_PHOTO:
            newState.photos.map((photo, i) => {
                if (photo._id === action.photoId) {
                    newState.photos.splice(i, 1)
                }
            })
            return newState;
        case PATCH_COMMENT:
            newState.comments.map((comment, i) => {
                if (comment._id === action.comment._id) {
                    newState.comments[i] = action.comment
                }
            })
            return newState;
        case DELETE_COMMENT:
            newState.comments.map((comment,i)=> {
               if(comment._id === action.commentId){
                    newState.comments.splice(i, 1)
               }
            })
           return newState;
        case CLEAR_SPOTS:
            return {}
        default:
            return state;
    }
}
export default spotsReducer;