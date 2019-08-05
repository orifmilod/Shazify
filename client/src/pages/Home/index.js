import React, { Component } from "react";
import queryString from "query-string";

import styled from "styled-components";
import Sidebar from "../../components/SideBar";
import Player from "../../components/Player";

import Grid from "../../styled/Grid";
import Search from "../../components/Search";
import Content from "../../components/Content";

const Container = styled(Grid)`
  grid-auto-flow: column;
  grid-auto-columns: 1fr 5fr;
  @media all and (max-width: 768px) {
    grid-auto-flow: row;
  }
`;

class Home extends Component {
  state = {
    currentTrackID: "",
    searchList: [],
    featuredPlaylist: [],
    userData: {}
  };
  //#region Methods
  getUserData = async access_token => {
    try {
      const respone = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const userData = await respone.json();
      this.setState({ userData });
    } catch (err) {
      console.error(err);
    }
  };

  getUserPlaylist = async access_token => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const playlists = await response.json();
      this.setState({ playlists: playlists.items });
    } catch (err) {
      console.error(err);
    }
  };

  playTrack = trackID => {
    this.setState({ currentTrackID: trackID });
  };

  handleSearch = (event, searchFilter) => {
    if (event.preventDefault !== undefined) event.preventDefault();
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

  audioSearch = async file => {
    let formatData = new FormData();
    formatData.append("audio", file.blob);
    try {
      const response = await fetch("http://localhost:8888/audioSearch", {
        method: "POST",
        body: formatData
      });
      const data = await response.json();

      let singersName = "";
      const music = data.metadata.music[0];
      const songName = music.title;
      music.artists.forEach(artist => (singersName += `${artist.name} `));
      this.handleSearch(this, `${singersName} ${songName}`);
    } catch (err) {
      console.error(err);
    }
  };

  getFeaturedPlaylists = async access_token => {
    try {
      const limit = 50;
      const country = this.state.userData.country;
      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const featuredPlaylist = await response.json();
      this.setState({ featuredPlaylist: featuredPlaylist.playlists.items });
    } catch (err) {
      console.error(err);
    }
  };
  getAccessToken = () => {
    const hash = queryString.parse(window.location.hash);
    return hash.access_token;
  };
  async componentDidMount() {
    let access_token = this.getAccessToken();
    if (access_token) {
      await this.getUserData(access_token);
      this.getUserPlaylist(access_token);
      this.getFeaturedPlaylists(access_token);
    }
  }
  //#endregion

  render() {
    const {
      userData,
      currentTrackID,
      searchList,
      playlists,
      featuredPlaylist
    } = this.state;
    return (
      <Container>
        <Sidebar userData={userData} playlists={playlists} />
        <Grid
          direction="row"
          templateRow="90px 6fr 100px"
          bg="light"
          height="100vh"
        >
          <Search
            handleSearch={this.handleSearch}
            audioSearch={this.audioSearch}
          />

          <Content
            searchList={searchList}
            playTrack={this.playTrack}
            featuredPlaylist={featuredPlaylist}
          />
          <Player trackID={currentTrackID} />
        </Grid>
      </Container>
    );
  }
}

export default Home;
