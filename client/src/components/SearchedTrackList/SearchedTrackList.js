import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import GetAccessToken from "../../utils/GetAccessToken";
import Track from "../Track";
import { toast } from "react-toastify";

import Grid from "../../styled/Grid";
import P from "../../styled/P";
import List from "../../styled/List";
import styled from "styled-components";
import { SadTear } from "styled-icons/fa-regular";

const TrackList = styled(List)`
  display: grid;
  grid-gap: 10px;
`;

class SearchedTrackList extends Component {
  state = {
    searchList: []
  };
  searchTrack = async searchedTrack => {
    const searchLimit = 40;
    try {
      const access_token = GetAccessToken();
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchedTrack}&type=track&market=PL&limit=${searchLimit}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      this.setState({ searchList: data.tracks.items });
    } catch (error) {
      toast.error("Sorry couldn't find any tracks. :(");
    }
  };
  componentWillReceiveProps(nextProps) {
    const searchedTrack = nextProps.match.params.searchedTrack;
    this.searchTrack(searchedTrack);
  }
  componentDidMount() {
    const searchedTrack = this.props.match.params.searchedTrack;
    this.searchTrack(searchedTrack);
  }
  render() {
    const { searchList, playTrack } = this.state;
    return (
      <>
        {searchList.length > 0 ? (
          <TrackList>
            {searchList.map(track => (
              <Track key={track.id} track={track} playTrack={playTrack} />
            ))}
          </TrackList>
        ) : (
          <Grid>
            <P>
              Sorry, couldn't find any tracks.
              <SadTear size={30} />
            </P>
          </Grid>
        )}
      </>
    );
  }
}

export default withRouter(SearchedTrackList);
