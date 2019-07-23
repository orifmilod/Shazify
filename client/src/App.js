import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import queryString from "query-string";
import Sidebar from "./components/SideBar";
import Login from "./pages/Login";
import Player from "./components/Player";
import Grid from "./common/Grid";
// import Grid from "@material-ui/core/Grid";
import Playlists from "./components/Playlists";
import Search from "./components/Search";
import Recorder from "./Recorder";

import theme from "./Theme";
class App extends React.Component {
  state = {
    userData: {},
    currentTrackID: ""
  };

  getAccessToken = () => {
    const hash = queryString.parse(window.location.hash);
    return hash.access_token;
  };
  componentDidMount() {
    let access_token = this.getAccessToken();
    if (access_token) {
      this.getUserData();
      this.getUserPlaylist();
    }
  }

  getUserData = () => {
    let access_token = this.getAccessToken();
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` }
    })
      .then(response => response.json())
      .then(userData => this.setState({ userData }))
      .catch(err => console.error(err));
  };

  getUserPlaylist = () => {
    let access_token = this.getAccessToken();
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${access_token}` }
    })
      .then(response => response.json())
      .then(playlists => this.setState({ playlists: playlists.items }))
      .catch(err => console.error(err));
  };

  playTrack = trackID => {
    this.setState({ currentTrackID: trackID });
  };

  render() {
    const { userData, playlists, currentTrackID } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {Object.keys(userData).length > 0 ? (
            <Grid direction="column" templateColumn="1fr 6fr">
              <Sidebar userData={userData} />
              <Grid direction="row" templateRow="7fr 1fr">
                <div className="bg-dark">
                  <Search
                    playTrack={this.playTrack}
                    handleSearch={this.handleSearch}
                  />
                </div>
                <Player />
              </Grid>
              {/* <Grid item className="bg-success full" sm={2}>
                <Profile userData={userData} />
                <Playlists playlists={playlists} />
              </Grid> */}
              {/* <Recorder />
             
              <Player trackID={currentTrackID} /> */}
            </Grid>
          ) : (
            <Login getUserData={this.getUserData} />
          )}
        </div>
      </ThemeProvider>
    );
  }
}
export default App;
