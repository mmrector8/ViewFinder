import jwtFetch from "./jwt";

export const RECEIVE_PHOTO = "photos/RECEIVE_PHOTO"
export const RECEIVE_PHOTOS = "photos/RECEIVE_PHOTOS"
export const REMOVE_PHOTO = "photos/REMOVE_PHOTO"

export const receivePhoto = (photo) => ({
    type: RECEIVE_PHOTO,
    photo
})

export const receivePhotos = (photos) => ({
    type: RECEIVE_PHOTOS,
    photos
})

export const removePhoto = (photoId) => ({
    type: REMOVE_PHOTO, 
    photoId
})

export const getPhoto = (photoId) => (store) => {
    if (store.photos) {
        return store.photos[photoId];
    } else {
        return null;
    }
}

export const getPhotos = (store) => {
    if (store.photos) {
        return Object.values(store.photos)
    } else {
        return [];
    }
}

export const fetchPhoto = (photoId) => async (dispatch) => {
    let res = await jwtFetch(`/api/photos/${photoId}`);
    if (res.ok) {
        let photo = await res.json();
        dispatch(receivePhoto(photo))
    }
}

export const fetchPhotos = () => async (dispatch) => {
  let res = await jwtFetch("/api/photos");
  if (res.ok) {
    let photos = await res.json();
    dispatch(receivePhotos(photos));
  }
};

export const createPhotos = (photo) => async (dispatch) => {
    let res = await jwtFetch(`/api/photos`, {
        method: "POST",
        body: JSON.stringify(photo),
    }) //CHRISTINE TO COME BACK TO 
}

const photosReducer = (state = {}, action) => {
    let newState = {...state};
    switch (action.type){
        case RECEIVE_PHOTO: 
            newState[action.photo.id] = action.photo;
        default:
            return state;    
    }
}

export default photosReducer;