import React from "react";
import Track from "../Track";
import Grid from "../../common/Grid";
const Home = props => {
  const { searchList, playTrack } = props;
  return (
    <Grid bg="light" space={5} overflow="auto">
      {searchList.length > 0 ? (
        searchList.map(track => (
          <Track key={track.id} track={track} playTrack={playTrack} />
        ))
      ) : (
        <h1>Home menu</h1>
      )}
    </Grid>
  );
};

export default Home;
