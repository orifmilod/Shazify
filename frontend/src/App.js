import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import getAccessToken from './utils/getAccessToken';
import getRefreshToken from './utils/getRefreshToken';
import getCodeAndState from './utils/getCodeAndState';
import Login from "./pages/Login";
import Home from "./pages/Home";
import theme from "./Theme";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {

    }
    else {
      const { code, state } = getCodeAndState();
      //TODO: Continues here
      const REDIRECT_URI = process.env.
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute path="/home" render={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

