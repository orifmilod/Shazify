import React from "react";
import Playlist from "./Playlist";
import Grid from "../../styled/Grid";

const Sidebar = props => {
  const { playlists, getPlaylist } = props;
  return (
    <Grid direction="row" bg="blue">
      <Playlist playlists={playlists} getPlaylist={getPlaylist} />
    </Grid>
  );
};

export default Sidebar;
