import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Grid, P } from "../../styled";
import { TrackTable, Loading } from "../index.js";

import { getPlaylist } from '../../api/spotify'
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

export default function Playlist({ playTrack, match }) {
  const [playlistData, setPlaylistData] = useState(undefined);
  const tracks = playlistData ? playlistData.tracks.items.map(obj => obj.track) : undefined;

  useEffect(() => {
    const playlist = getPlaylist(match.params.playlistID);
    setPlaylistData(playlist)
  }, [match.params.playlistID]);


  toast.error("Something went wrong when getting playlist");

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
