import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { Grid } from "../../styled";
import { Sidebar, Player, Navbar, Content } from "../../components";

import { getUserData, getFeaturedPlaylists } from '../../api/spotify';
import handleError from '../../utils/handleError';
import { UPDATE_USER_DATA, UPDATE_FUTURED_PLAYLIST } from '../../constant/actionTypes';

const Container = styled(Grid)`
  grid-auto-flow: column;
  grid-auto-columns: 1fr 5fr;
  @media all and (max-width: 768px) {
    grid-auto-flow: row;
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUserData() {
    try {
      const data = await getUserData();
      fetchFeaturedPlaylist(data.country);
      dispatch({ type: UPDATE_USER_DATA, payload: data });
    }
    catch (error) {
      handleError('Something went wrong when fetching your personal data', error)
    }
  }

  async function fetchFeaturedPlaylist(country) {
    try {
      const trackLimit = 50;
      const data = await getFeaturedPlaylists(trackLimit, country);
      dispatch({ type: UPDATE_FUTURED_PLAYLIST, payload: data });
    }
    catch (error) {
      handleError('Some error occured when fetching Featured Playlists.', error)
    }
  }

  const ContentContainer = styled(Grid)`
    height: 100vh;
    grid-template-rows: 50px 2fr 100px;
    grid-auto-flow: row;
  `;

  return (
    <Container>
      <Sidebar />
      <ContentContainer bg="light">
        <Navbar />
        <Content />
        <Player />
      </ContentContainer>
    </Container>
  );
}