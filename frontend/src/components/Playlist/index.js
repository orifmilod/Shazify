import React, { Component } from "react";
import { toast } from "react-toastify";
import GetAccessToken from "../../utils/GetAccessToken";

import TrackTable from "../TrackTable";
import styled from "styled-components";
import Grid from "../../styled/Grid";
import P from "../../styled/P";

const HeaderImage = styled.img`
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
  margin: auto;
  width: 150px;
  height: 150px;
`;
const TableNav = styled(Grid)`
  grid-auto-columns: 250px 1fr;
  grid-auto-flow: column;

  padding: 10px 24px;
`;
class Playlist extends Component {
  state = {
    playlistData: undefined
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
    const { playlistData } = this.state;
    const { playTrack } = this.props;
    const tracks = playlistData
      ? playlistData.tracks.items.map(obj => obj.track)
      : undefined;
    return (
      <React.Fragment>
        {playlistData !== undefined ? (
          <>
            <TableNav>
              <HeaderImage src={playlistData.images[0].url} />
              <Grid>
                <P font="xxl">{playlistData.name}</P>
                <P color="grey"> {playlistData.description}</P>
                <small>followers: {playlistData.followers.total} </small>
              </Grid>
            </TableNav>
            <TrackTable playTrack={playTrack} tracks={tracks} />
          </>
        ) : (
            <div>loading</div>
          )}
      </React.Fragment>
    );
  }
}
export default Playlist;
