import React from "react";
import "./App.css";
import { ThemeProvider } from "styled-components";
import queryString from "query-string";
import Sidebar from "./components/SideBar";
import Login from "./pages/Login";
import Player from "./components/Player";
import Grid from "./common/Grid";
import Search from "./components/Search";
import Home from "./components/Home";

import theme from "./Theme";

class App extends React.Component {
  state = {
    userData: {},
    currentTrackID: "",
    searchList: []
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

  handleSearch = (e, searchFilter) => {
    e.preventDefault();
    const searchLimit = 20;
    const access_token = this.getAccessToken();
    const URIEconded = encodeURI(searchFilter);
    if (searchFilter) {
      fetch(
        `https://api.spotify.com/v1/search?q=${URIEconded}&type=track&market=PL&limit=${searchLimit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(data => data.json())
        .then(result => this.setState({ searchList: result.tracks.items }))
        .catch(err => console.error(err));
    } else {
      console.log("No Input");
    }
  };

  audioSearch = blob => {
    console.log(blob);
    let formatData = new FormData();
    formatData.append("data", blob);

    fetch("http://localhost:8888/audioSearch", {
      method: "POST",
      body: { audio: blob }
    })
      .then(res => console.log(res.status))
      .catch(err => console.error(err));
    // let formData = new FormData();
    // formData.append('file', this.state.file.blobURL);
    // // const file = URL.createObjectURL(this.state.file.blob);
    // fetch(`https://api.audd.io/?return=timecode%2Citunes%2Cdeezer%2Clyrics&itunes_country=us`, {
    //     method: 'POST',
    //     'Access-Control-Allow-Origin' : '*',
    //     mode: 'cors', // no-cors, cors, *same-origin
    //     headers:{
    //         'Accept': 'Application/json, */*',
    //         'Content-Type': ' application/x-www-form-urlencoded'
    //     },
    //     body: formData,
    // })
    // .then(data => data.json())
    // .then(result => console.log(result))
    // .catch(err => console.log(err))
  };

  render() {
    const { userData, currentTrackID, searchList } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {Object.keys(userData).length > 0 ? (
            <Grid direction="column" templateColumn="1fr 5fr">
              <Sidebar userData={userData} />
              <Grid
                direction="row"
                templateRow="100px 6fr 100px"
                bg="light"
                height="100vh"
              >
                <Search
                  handleSearch={this.handleSearch}
                  audioSearch={this.audioSearch}
                />

                <Home searchList={searchList} playTrack={this.playTrack} />
                <Player trackID={currentTrackID} />
              </Grid>
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
