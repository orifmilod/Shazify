import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import { Grid } from "../../styled";
import Playlist from "./Playlist";
import Profile from "./Profile";

import { getUserPlaylist, getUserData } from '../../api/spotify';
import handleError from '../../utils/handleError';

const Container = styled(Grid)`
  background: rgb(84, 136, 150);
  grid-auto-rows: 180px 1fr;
`

export default function Sidebar() {
  const [playlist, setPlaylist] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getPlaylist();
    fetchUserData();
  }, []);

  async function getPlaylist() {
    try {
      const userPlaylist = await getUserPlaylist();
      setPlaylist(userPlaylist.items);
    }
    catch (error) {
      handleError('Something went wrong when fetching your playlist!', error);
    }
  };

  async function fetchUserData() {
    try {
      const data = await getUserData();
      setUserData(data);
    }
    catch (error) {
      handleError('Something went wrong when fetching your personal data', error)
    }
  }

  return (
    <Container bg="blue">
      {userData && <Profile userData={userData} />}
      {playlist && <Playlist playlists={playlist} />}
    </Container>
  );
};