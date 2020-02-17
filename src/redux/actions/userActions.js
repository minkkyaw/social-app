import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("fbIdToken");
  delete axios.defaults.headers.common[`Authorization`];
  window.location.href = "/login";
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      return dispatch({ type: SET_USER, payload: res.data.userData });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(res => {
      dispatch(getUserData());
      alert("Successfully uploaded.");
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const editUserDetials = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });

  axios
    .patch("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const markNotificationsRead = notiIds => dispatch => {
  axios
    .post("/notifications", notiIds)
    .then(res => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const fbIdToken = `Bearer ${token}`;
  localStorage.setItem("fbIdToken", `Bearer ${token}`);
  axios.defaults.headers.common[`Authorization`] = fbIdToken;
};
