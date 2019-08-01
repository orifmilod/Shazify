import React from "react";
import Profile from "../Profile";
import Playlist from "../Playlist";
import Grid from "../../styled/Grid";

const Sidebar = props => {
  const { userData, playlists } = props;
  return (
    <Grid direction="row" bg="greenGradient" templateRow="225px 1fr">
      <Profile userData={userData} />
      <Playlist playlists={playlists} />
    </Grid>
  );
};

export default Sidebar;
