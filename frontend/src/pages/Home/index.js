import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { Grid } from "../../styled";
import { Sidebar, Player, Search, Content } from "../../components";

import { getUserData } from '../../api/spotify';
import handleError from '../../utils/handleError';
import { UPDATE_USER_DATA } from '../../constant/actionTypes';

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
      const data = await getUserData()
      dispatch({ type: UPDATE_USER_DATA, payload: data });
    }
    catch (error) {
      handleError('Something went wrong when fetching your personal data', error)
    }
  }

  return (
    <Container>
      <Sidebar />
      {/* ROW OR COLUMN? */}
      <Grid direction="row" bg="light" height="100vh" templateRow="50px 2fr 100px" >
        <Search />
        <Content />
        <Player />
      </Grid>
    </Container>
  );
}