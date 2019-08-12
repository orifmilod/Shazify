import React from "react";
import Track from "../Track";
import Grid from "../../styled/Grid";
import List from "../../styled/List";
import Gallery from "react-photo-gallery";
import styled from "styled-components";

const TrackList = styled(List)`
  display: grid;
  grid-gap: 10px;
`;
const Content = props => {
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
    <Grid bg="light" overflow="auto" px="lg" py="md">
      {searchList.length > 0 ? (
        <TrackList>
          {searchList.map(track => (
            <Track key={track.id} track={track} playTrack={playTrack} />
          ))}
        </TrackList>
      ) : (
        <React.Fragment>
          {featuredPlaylist && (
            <Gallery photos={photos} onClick={e => console.log(e.target)} />
          )}
        </React.Fragment>
      )}
    </Grid>
  );
};

export default Content;
