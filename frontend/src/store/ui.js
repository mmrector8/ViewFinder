// TYPE CONSTANTS
import { REMOVE_LIKE, removeLike, deleteLike } from "./photos";
import { RECEIVE_LIKE, receiveLike, addLike } from "./photos";
export const OPEN_SIGNIN_MODAL = "ui/openSigninModal";
export const CLOSE_SIGNIN_MODAL = "ui/closeSigninModal";
export const OPEN_SIGNUP_MODAL = "ui/openSignupModal";
export const CLOSE_SIGNUP_MODAL = "ui/closeSignupModal";
export const OPEN_USER_MODAL = "ui/openUserModal";
export const CLOSE_USER_MODAL = "ui/closeUserModal";
export const OPEN_PHOTO_SHOW_MODAL = "ui/openPhotoShowModal";
export const CLOSE_PHOTO_SHOW_MODAL = "ui/closePhotoShowModal";
export const OPEN_SEARCH_MODAL = "ui/openSearchModal";
export const CLOSE_SEARCH_MODAL = "ui/closeSearchModal";
export const OPEN_UPLOAD_MODAL = "ui/openUploadModal";
export const CLOSE_UPLOAD_MODAL = "ui/closeUploadModal";

// ACTION CREATORS
export const openSigninModal = () => ({
  type: OPEN_SIGNIN_MODAL,
});

export const closeSigninModal = () => ({
  type: CLOSE_SIGNIN_MODAL,
});

export const openSignupModal = () => ({
  type: OPEN_SIGNUP_MODAL,
});

export const closeSignupModal = () => ({
  type: CLOSE_SIGNUP_MODAL,
});

export const openUserModal = () => ({
  type: OPEN_USER_MODAL,
});

export const closeUserModal = () => ({
  type: CLOSE_USER_MODAL,
});

export const openPhotoShowModal = (photo) => ({
  type: OPEN_PHOTO_SHOW_MODAL,
  payload: photo
})

export const closePhotoShowModal = () => ({
  type: CLOSE_PHOTO_SHOW_MODAL,
});
export const openSearchModal = () => ({
  type: OPEN_SEARCH_MODAL,
});

export const closeSearchModal = () => ({
  type: CLOSE_SEARCH_MODAL,
});

export const openUploadModal = () => ({
  type: OPEN_UPLOAD_MODAL,
});

export const closeUploadModal = () => ({
  type: CLOSE_UPLOAD_MODAL,
});

// REDUCER
const initialState = {
  signinModalOpen: false,
  signupModalOpen: false,
  userModalOpen: false,
  photoShowModalOpen: false,
  searchModalOpen: false,
  uploadModalOpen: false,
};

const uiReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case OPEN_SIGNIN_MODAL:
      return { ...state, signinModalOpen: true };
    case CLOSE_SIGNIN_MODAL:
      return { ...state, signinModalOpen: false };
    case OPEN_SIGNUP_MODAL:
      return { ...state, signupModalOpen: true };
    case CLOSE_SIGNUP_MODAL:
      return { ...state, signupModalOpen: false };
    case OPEN_USER_MODAL:
      return { ...state, userModalOpen: true };
    case CLOSE_USER_MODAL:
      return { ...state, userModalOpen: false };
    case OPEN_PHOTO_SHOW_MODAL:
      return { ...state, photoShowModalOpen: action.payload };
    case CLOSE_PHOTO_SHOW_MODAL:
      return { ...state, photoShowModalOpen: false };
    case OPEN_SEARCH_MODAL:
      return { ...state, searchModalOpen: true };
    case CLOSE_SEARCH_MODAL:
      return { ...state, searchModalOpen: false };
    case OPEN_UPLOAD_MODAL:
      return { ...state, uploadModalOpen: true };
    case CLOSE_UPLOAD_MODAL:
      return { ...state, uploadModalOpen: false };
    case RECEIVE_LIKE:
      newState.photoShowModalOpen.likes.push(action.like)
      return newState;
    case REMOVE_LIKE:
      newState.photoShowModalOpen.likes.map((like, i) => {
        if (like._id=== action.likeId) {
          newState.photoShowModalOpen.likes.splice(i, 1)
        }
      })
      console.log(action.likeId)
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
