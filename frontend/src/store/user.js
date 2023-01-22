import jwtFetch from "./jwt";
import { RECEIVE_PHOTO, receivePhoto, createPhoto, REMOVE_PHOTO, removePhoto, deletePhoto } from "./photos";

export const RECEIVE_USER = 'users/RECEIVE_USER'
export const CLEAR_USER = 'users/CLEAR_USER'

export const receiveUser = user =>({
    type: RECEIVE_USER,
    user
}) 

export const clearUser = user => ({
    type: CLEAR_USER,
});

export const getUser = (userId)=>(state)=>{
    if(state.users){
        return state.users[userId]
    }
}

export const fetchUser = (userId)=> async dispatch =>{
    try{
        const res = await jwtFetch(`/api/users/${userId}`)
        const user = await res.json()
        return dispatch(receiveUser(user))
    }catch(err){
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors));
        }
    }
}

const usersReducer = (state={}, action)=>{
    const newState = {...state}
    switch(action.type){
        case RECEIVE_USER:
            return {...newState, ...action.user}
        case CLEAR_USER:
            return {};
        case REMOVE_PHOTO:
            newState.photos.map((photo, i) => {
                if (photo._id === action.photoId) {
                    newState.photos.splice(i, 1)
                }
            })
            return newState;
        default:
            return state;
    }
}
export default usersReducer;