import React, { Component } from "react";
import queryString from "query-string";
import Track from "../Track";
import Button from "../../common/Button";
import Grid from "../../common/Grid";
import Flex from "../../common/Flex";
import FlexItem from "../../common/FlexItem";
import Input from "../../common/Input";
import Container from "../../common/Container";

class Search extends Component {
  state = {
    searchList: [],
    searchInput: ""
  };

  getAccessToken = () => {
    const hash = queryString.parse(window.location.hash);
    return hash.access_token;
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    const searchLimit = 20;
    const searchFilter = encodeURI(this.state.searchInput);
    const access_token = this.getAccessToken();
    if (searchFilter) {
      fetch(
        `https://api.spotify.com/v1/search?q=${searchFilter}&type=track&market=PL&limit=${searchLimit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(data => data.json())
        .then(result => this.setState({ searchList: result.tracks.items }))
        .catch(err => console.error(err));
    } else {
      console.log("No Input");
    }
  };

  getPlayer = e => {
    e.preventDefault();
    const access_token = this.getAccessToken();

    fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(data => data.json())
      .then(result => console.log(result))
      .catch(error => console.error(error));
  };

  render() {
    const { searchList } = this.state;
    const { playTrack } = this.props;

    return (
      <Container>
        <Grid direction="row" templateRow="75px">
          <Grid direction="column" templateColumn="2fr 1fr" bg="light">
            <Grid direction="column">
              <Input
                placeholder="Search track..."
                type="text"
                onChange={this.handleChange}
                name="searchInput"
              />
              <Button color="green" onClick={this.handleSearch}>
                <i class="fas fa-search"></i>
              </Button>
            </Grid>
          </Grid>
          <div className="bg-light"></div>

          {/* <div>
            <Button>Shazam</Button>
          </div> */}
        </Grid>
        {/* 
        {searchList.length > 0 &&
          searchList.map(track => (
            <Track key={track.id} track={track} playTrack={playTrack} />
          ))} */}
      </Container>
    );
  }
}
export default Search;
