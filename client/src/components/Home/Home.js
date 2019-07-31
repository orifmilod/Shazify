import React from "react";
import Track from "../Track";
import Grid from "../../common/Grid";
import Gallery from "react-photo-gallery";

const Home = props => {
  const { searchList, playTrack, featuredPlaylist } = props;
  const photos = featuredPlaylist.map(pl => {
    return {
      id: pl.id,
      src: pl.images[0].url,
      width: 1,
      height: 1
    };
  });
  return (
    <Grid bg="light" space={5} overflow="auto">
      {searchList.length > 0 ? (
        searchList.map(track => (
          <Track key={track.id} track={track} playTrack={playTrack} />
        ))
      ) : (
        <>
          {featuredPlaylist && (
            <Gallery photos={photos} onClick={e => console.log(e.target)} />
          )}
        </>
      )}
    </Grid>
  );
};

export default Home;
