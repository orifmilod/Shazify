import React from "react";
import Playlist from "./Playlist";
import Grid from "../../styled/Grid";
import styled from 'styled-components';

const Background = styled(Grid)`
background: rgb(84, 136, 150);
`
const Sidebar = props => {
  const { playlists, getPlaylist } = props;
  return (
    <Background direction="row" bg="blue">
      <Playlist playlists={playlists} getPlaylist={getPlaylist} />
    </Background>
  );
};

export default Sidebar;
