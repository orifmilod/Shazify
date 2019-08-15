import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Login";
import Home from "./pages/Home";
import theme from "./Theme";
import queryString from "query-string";
import ProtectedRoute from "./routes/ProtectedRoute";

class App extends React.Component {
  componentWillMount() {
    const hash = queryString.parse(window.location.hash);
    if (hash.access_token) {
      localStorage.setItem("accessToken", hash.access_token);
    }
  }
  render() {
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
}
export default App;
