import React from "react";
import Playlist from "./Playlist";
import Grid from "../../styled/Grid";
import { Link } from 'react-router-dom';
import img from '../../img/favicon.png';
export default function ({ playlists, getPlaylist }) {
  return (
    <div>
      <Grid direction="row" bg="blue">
        <Link to='/home'><img src={img} width='100px' /></Link>
        <Playlist playlists={playlists} getPlaylist={getPlaylist} />
      </Grid>
    </div>
  );
}
