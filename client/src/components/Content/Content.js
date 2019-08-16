import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";

import SearchedTrackList from "../SearchedTrackList";
import FeaturedPlaylist from "../FeaturedPlaylist";
import Playlist from "../Playlist";

//Styled components
import Grid from "../../styled/Grid";

class Content extends Component {
  render() {
    return (
      <Grid overflow="auto">
        <Route path="/home" exact component={FeaturedPlaylist} />
        <Route
          path="/home/search/:searchedTrack"
          component={SearchedTrackList}
        />
        <Route path="/home/playlist/:playlistID" component={Playlist} />
      </Grid>
    );
  }
}

export default withRouter(Content);
