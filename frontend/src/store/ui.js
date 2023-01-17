// TYPE CONSTANTS
export const OPEN_SIGNIN_MODAL = "ui/openSigninModal";
export const CLOSE_SIGNIN_MODAL = "ui/closeSigninModal";
export const OPEN_SIGNUP_MODAL = "ui/openSignupModal";
export const CLOSE_SIGNUP_MODAL = "ui/closeSignupModal";

// ACTION CREATORS
export const openSigninModal = () => ({
  type: OPEN_SIGNIN_MODAL
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

// REDUCER
const initialState = {
  signinModalOpen: false,
  signupModalOpen: false
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIGNIN_MODAL:
      return { signinModalOpen: true, signupModalOpen: false };
    case CLOSE_SIGNIN_MODAL:
      return { ...state, signinModalOpen: false };
    case OPEN_SIGNUP_MODAL:
      return { signinModalOpen: false, signupModalOpen: true };
    case CLOSE_SIGNUP_MODAL:
      return { ...state, signupModalOpen: false };
    default:
      return state;
  }
};

export default uiReducer;