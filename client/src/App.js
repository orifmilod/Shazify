import React from "react";
import "./App.css";
import queryString from "query-string";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./pages/Login";
import Player from "./components/Player";
import Grid from "@material-ui/core/Grid";

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
      <div className="App">
        {Object.keys(userData).length > 0 ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            className="datas "
          >
            <Grid item className="bg-success full" sm={2}>
              <Profile userData={userData} />
              {/* <Playlists playlists={playlists}/> */}
            </Grid>
            <Grid item sm={7} className="bg-dark"></Grid>
            <Grid item sm={3} className="bg-light full">
              <Search
                playTrack={this.playTrack}
                handleSearch={this.handleSearch}
              />
            </Grid>
            <Grid item xs={12}>
              <Player trackID={currentTrackID} />
            </Grid>
          </Grid>
        ) : (
          <Login getUserData={this.getUserData} />
        )}
      </div>
    );
  }
}
export default App;
