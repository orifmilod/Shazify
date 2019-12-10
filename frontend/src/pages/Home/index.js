import React, { Component } from "react";

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

class Home extends Component {
  state = {
    currentTrackID: "",
    searchList: [],
    userData: {}
  };

  handleSearch = (event, searchFilter) => {
    if (event.preventDefault !== undefined) event.preventDefault();
    if (searchFilter === "") {
      this.notifyWarning("Please search something.");
      return;
    }
    const URIEconded = encodeURI(searchFilter);
    this.props.history.push(`/home/search/${URIEconded}`);
  };

  //#endregion
  render() {
    const { currentTrackID } = this.state;
    return (
      <Container>
        <Sidebar />

        <Grid
          direction="row"
          bg="light"
          height="100vh"
          templateRow="50px 2fr 100px"
        >
          <Search
            handleSearch={this.handleSearch}
            audioSearch={this.audioSearch}
          />
          <Content playTrack={this.playTrack} />

          <Player trackID={currentTrackID} />
        </Grid>
      </Container>
    );
  }
}

export default Home;
