import React from "react";
import Profile from "../Profile";
import Playlist from "../Playlists";
import Container from "../../common/Container";

const Sidebar = props => {
  const { userData, playlist } = props;
  return (
    <Container bg="darkGradient">
      <Profile userData={userData} />
      {/* <Playlist /> */}
    </Container>
  );
};

export default Sidebar;
