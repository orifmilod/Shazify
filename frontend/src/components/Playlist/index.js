import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Grid, P } from "../../styled";
import { TrackTable, Loading } from "../index.js";

import GetAccessToken from "../../utils/GetAccessToken";

const HeaderImage = styled.img`
  margin: auto;
  width: 150px;
  height: 150px;
  box-shadow: 1px 1px 30px -1px rgba(0, 0, 0, 0.75);
`;
const TableNav = styled(Grid)`
  padding: 10px 25px;
  grid-auto-columns: 250px 1fr;
  grid-auto-flow: column;
`;

export default function Playlist(props) {
  const { playTrack } = props;
  const [playlistData, setPlaylistData] = useState(undefined);
  const tracks = playlistData ? playlistData.tracks.items.map(obj => obj.track) : undefined;

  useEffect(() => {
    getPlaylist(props.match.params.playlistID);
  }, [props.match.params.playlistID]);

  async function getPlaylist(playlistID) {
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
      setPlaylistData(data);
    }
    catch (error) {
      toast.error("Something went wrong when getting playlist");
    }
  };


  return (
    <>
      {!playlistData ?
        <>
          <TableNav>
            <HeaderImage src={playlistData.images[0].url} />
            <Grid>
              <P font="xxl">{playlistData.name}</P>
              <P color="grey"> {playlistData.description}</P>
              <small>Followers: {playlistData.followers.total} </small>
            </Grid>
          </TableNav>
          <TrackTable playTrack={playTrack} tracks={tracks} />
        </>
        :
        <Loading />
      }
    </>
  );
}
