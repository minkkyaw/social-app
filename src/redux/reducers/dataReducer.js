import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      return {
        ...state,
        screams: actions.payload,
        loading: false
      };
    default:
      return state;
  }
};
