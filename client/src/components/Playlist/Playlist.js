import React, { Component } from "react";
import { toast } from "react-toastify";
import GetAccessToken from "../../utils/GetAccessToken";
import ConvertMs from "../../utils/ConvertMs";

import { Play } from "styled-icons/evil";
import styled from "styled-components";
import { Table, Row, Data, Header } from "../../styled/Table";
import Grid from "../../styled/Grid";
import P from "../../styled/P";

const HeaderRow = styled(Row)`
  font-size: 14px;
  border-bottom: 0.5px lightgray solid;
  > th {
    padding: 10px 0;
    color: gray;
  }
`;
const HeaderImage = styled.img`
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
  margin: auto;
  width: 150px;
  height: 150px;
`;
const BodyRow = styled(Row)`
  > td {
    padding: 10px 0;
    font-size: 14px;
  }
  :hover {
    background: #ececec;
    > td > svg {
      color: black;
    }
  }
  border-bottom: 0.5px lightgray solid;
`;
const PlayButton = styled(Play)`
  color: rgba(0, 0, 0, 0);
  height: 36px;
  width: 36px;
  margin: 0 5px;
  transition: 0.2s ease-in-out;
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
    let { playlistData } = this.state;
    let { playTrack } = this.props;
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
            <Table mx="xxl" my="lg" overflow="auto">
              <HeaderRow>
                <Header>{/* For Play Button */}</Header>
                <Header>Title</Header>
                <Header>Artist</Header>
                <Header>Album</Header>
                <Header>Time</Header>
              </HeaderRow>

              {playlistData.tracks.items.map(item => {
                const { track } = item;
                return (
                  <BodyRow key={track.id} onClick={() => playTrack(track.id)}>
                    <Data>
                      <PlayButton />
                    </Data>
                    <Data>{track.name}</Data>
                    <Data>
                      {track.artists.map(artist => `${artist.name} `)}
                    </Data>
                    <Data>{track.album.name}</Data>
                    <Data>{ConvertMs(track.duration_ms)}</Data>
                  </BodyRow>
                );
              })}
            </Table>
          </>
        ) : (
          <div>loading</div>
        )}
      </React.Fragment>
    );
  }
}
export default Playlist;
