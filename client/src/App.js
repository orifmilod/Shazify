import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import Login from "./pages/Login";
import Home from "./pages/Home";
import theme from "./Theme";
import queryString from "query-string";

class App extends React.Component {
  render() {
    const hash = queryString.parse(window.location.hash);

    return (
      <ThemeProvider theme={theme}>
        <div className="App">{hash.access_token ? <Home /> : <Login />}</div>
      </ThemeProvider>
    );
  }
}
export default App;
