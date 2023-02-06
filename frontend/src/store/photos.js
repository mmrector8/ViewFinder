import jwtFetch from "./jwt";

export const RECEIVE_PHOTOS_SPLASH = "photos/RECEIVE_PHOTOS_SPLASH";
export const RECEIVE_PHOTO = "photos/RECEIVE_PHOTO";
export const REMOVE_PHOTO = "photos/REMOVE_PHOTO";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";
export const CLEAR_PHOTOS = "photos/CLEAR_PHOTOS";

const receiveLike = (like) => ({
  type: RECEIVE_LIKE,
  like,
});

const removeLike = (likeId) => ({
  type: REMOVE_LIKE,
  likeId,
});

export const receivePhotosSplash = (photos) => ({
  type: RECEIVE_PHOTOS_SPLASH,
  photos,
});

export const receivePhoto = (photo) => {
 return {
  type: RECEIVE_PHOTO,
  photo,
  }
};

export const removePhoto = (photoId) => ({
  type: REMOVE_PHOTO,
  photoId,
});

export const clearPhotos = () => ({
  type: CLEAR_PHOTOS,
});

export const getPhoto = (photoId) => (store) => {
  if (store.photos) {
    return store.photos[photoId];
  } else {
    return null;
  }
};

export const getPhotos = (store) => {
  if (store.photos) {
    return Object.values(store.photos);
  } else {
    return [];
  }
};

export const fetchPhoto = (photoId) => async (dispatch) => {
  let res = await jwtFetch(`/api/photos/${photoId}`);
  if (res.ok) {
    let photo = await res.json();
    dispatch(receivePhoto(photo));
  }
};

export const fetchPhotosSplash = () => async (dispatch) => {
  let res = await jwtFetch("/api/photos");
  if (res.ok) {
    let photos = await res.json();
    dispatch(receivePhotosSplash(photos));
  }
};

export const createPhoto = (formData) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/photos`, {
      method: "POST",
      body: formData,
    });
    const newPhoto = await res.json();
    dispatch(receivePhoto(newPhoto));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deletePhoto = (photoId) => async (dispatch) => {
  const res = await jwtFetch(`/api/photos/${photoId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removePhoto(photoId));
  }
};

export const addLike = (photo) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/likes/photos/${photo._id}`, {
      method: "POST",
      body: JSON.stringify(photo),
    });
    const newLike = await res.json();
    dispatch(receiveLike(newLike));
    return newLike;
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const deleteLike = (likeId) => async (dispatch) => {
  const res = await jwtFetch(`/api/likes/${likeId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeLike(likeId));
  }
};

const photosReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_PHOTOS_SPLASH:
      return { ...newState, ...action.photos };
    case CLEAR_PHOTOS:
      return {};
    default:
      return state;
  }
};

export default photosReducer;
