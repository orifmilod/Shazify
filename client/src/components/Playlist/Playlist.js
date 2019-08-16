import React, { Component } from "react";
import PlaylistTrack from "./PlaylistTrack";
import { toast } from "react-toastify";

import GetAccessToken from "../../utils/GetAccessToken";
import ConvertMs from "../../utils/ConvertMs";
import styled from "styled-components";
import { Table, Row, Data, Header } from "../../styled/Table";

const HeaderRow = styled(Row)`
  font-size: 14px;
  border-bottom: 0.5px lightgray solid;
  > th {
    padding: 10px 0;
    color: gray;
  }
`;
const HeaderImage = styled.img`
  width: 100%;
  height: 100px;
  position: absolute;
`;
const BodyRow = styled(Row)`
  > td {
    padding: 10px 0;
    font-size: 14px;
  }
  border-bottom: 0.5px lightgray solid;
`;
class Playlist extends Component {
  state = {
    playlistData: {}
  };
  getPlaylist = async playlistID => {
    try {
      const access_token = GetAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      console.log(data);
      this.setState({ playlistData: data });
    } catch (error) {
      toast.error("Some error occured.");
    }
  };
  componentWillReceiveProps(nextProps) {
    const playlistID = nextProps.match.params.playlistID;
    this.getPlaylist(playlistID);
  }
  componentDidMount() {
    const playlistID = this.props.match.params.playlistID;
    this.getPlaylist(playlistID);
  }
  render() {
    const {
      description,
      name,
      followers,
      images,
      tracks
    } = this.state.playlistData;

    return (
      <React.Fragment>
        {/* <HeaderImage /> */}
        <Table mx="xxl" my="lg" overflow="auto">
          <HeaderRow>
            <Header>Title</Header>
            <Header>Artist</Header>
            <Header>Album</Header>
            <Header>Time</Header>
          </HeaderRow>
          {tracks &&
            tracks.items.map(item => {
              const { track } = item;
              return (
                <BodyRow>
                  <Data>{track.name}</Data>
                  <Data>{track.artists.map(artist => `${artist.name} `)}</Data>
                  <Data>{track.album.name}</Data>
                  <Data>{ConvertMs(track.duration_ms)}</Data>
                </BodyRow>
              );
            })}
          {/* <BodyRow>
            <Data>Hello</Data>
            <Data>Adele</Data>
            <Data>Something</Data>
            <Data>3:09</Data>
          </BodyRow>
          <BodyRow>
            <Data>Hello</Data>
            <Data>Adele</Data>
            <Data>Something</Data>
            <Data>3:09</Data>
          </BodyRow> */}
        </Table>
      </React.Fragment>
    );
  }
}
export default Playlist;
