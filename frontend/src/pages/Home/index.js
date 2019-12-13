import React from "react";

//Styled components
import styled from "styled-components";
import { Grid } from "../../styled";
import { Sidebar, Player, Search, Content } from "../../components";

const Container = styled(Grid)`
  grid-auto-flow: column;
  grid-auto-columns: 1fr 5fr;
  @media all and (max-width: 768px) {
    grid-auto-flow: row;
  }
`;

export default function Home() {
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