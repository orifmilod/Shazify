import React from "react";
import { withRouter, Route } from "react-router-dom";

import SearchedTrackList from "../SearchedTrackList";
import FeaturedPlaylist from "../FeaturedPlaylist";
import Playlist from "../Playlist";

import Grid from "../../styled/Grid";

function Content({ playTrack }) {
  return (
    <Grid overflow="auto">
      <Route path="/home" exact render={props => <FeaturedPlaylist {...props} />} />
      <Route
        path="/home/search/:searchedTrack"
        render={props => (<SearchedTrackList {...props} playTrack={playTrack} />)}

      />
      <Route
        path="/home/playlist/:playlistID"
        render={props => <Playlist {...props} playTrack={playTrack} />}
      />
    </Grid>
  );
}

export default withRouter(Content);
