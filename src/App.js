import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./App.css";

import Home from "./pages/home";
import SignUp from "./pages/signup";
import LogIn from "./pages/login";
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import themeObject from "./utils/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";

const theme = createMuiTheme(themeObject);

const token = localStorage.fbIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser);
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common[`Authorization`] = token;
    store.dispatch(getUserData());
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/signup" component={SignUp} />
                <AuthRoute exact path="/login" component={LogIn} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
