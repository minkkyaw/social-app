import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case SET_USER:
      return {
        loading: false,
        authenticated: true,
        ...action.payload
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(not => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
};
