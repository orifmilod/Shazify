import React, { Component } from "react";

//Toaster
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styled components
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
    userData: {}
  };
  //#region Toaster Methods
  notifySuccess = messege => {
    toast.success(messege);
  };
  notifyError = messege => {
    toast.error(messege);
  };
  notifyWarning = messege => {
    toast.warn(messege);
  };
  //#endregion

  //#region Methods
  getUserData = async access_token => {
    try {
      const respone = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const userData = await respone.json();
      this.setState({ userData });
    } catch (err) {
      this.notifyError("Sorry, couldn't get user's data :(");
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
      this.notifyError("Sorry, Couldn't fetch your playlist");
      console.error(err);
    }
  };

  playTrack = trackID => {
    this.setState({ currentTrackID: trackID });
  };

  handleSearch = (event, searchFilter) => {
    if (event.preventDefault !== undefined) event.preventDefault();
    if (searchFilter === "") {
      this.notifyWarning("Please search something.");
      return;
    }
    const URIEconded = encodeURI(searchFilter);
    this.props.history.push(`/home/search/${URIEconded}`);
  };

  audioSearch = async file => {
    let formatData = new FormData();
    formatData.append("audio", file.blob);
    try {
      const response = await fetch(
        "https://ispotify.herokuapp.com/audioSearch",
        {
          method: "POST",
          body: formatData
        }
      );
      const data = await response.json();
      let singersName = "";
      const music = data.metadata.music[0];
      const songName = music.title;
      music.artists.forEach(artist => (singersName += `${artist.name} `));
      //Search as a text
      this.handleSearch(this, `${singersName} ${songName}`);
    } catch (err) {
      this.notifyError("Sorry couldn't find the track. :(");
    }
  };

  getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };
  async componentDidMount() {
    let access_token = this.getAccessToken();
    if (access_token) {
      await this.getUserData(access_token);
      this.getUserPlaylist(access_token);
    }
  }

  //#endregion
  render() {
    toast.configure();
    const { userData, currentTrackID, playlists } = this.state;
    return (
      <Container>
        <Sidebar
          getPlaylist={this.getPlaylist}
          userData={userData}
          playlists={playlists}
        />

        <Grid
          direction="row"
          bg="light"
          height="100vh"
          templateRow="50px 2fr 100px"
        >
          <Search
            handleSearch={this.handleSearch}
            audioSearch={this.audioSearch}
          />
          <Content playTrack={this.playTrack} />

          <Player trackID={currentTrackID} />
        </Grid>
      </Container>
    );
  }
}

export default Home;
