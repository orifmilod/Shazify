import React from "react";

import ListItem from "../../styled/ListItem";
import Image from "../../styled/Image";
import Grid from "../../styled/Grid";
import P from "../../styled/P";

import { PlayCircle } from "styled-icons/boxicons-regular/PlayCircle";
import styled from "styled-components";

import ConvertMs from "../../utils/ConvertMs";

const PlayButton = styled(PlayCircle)`
  color: #1c5769;
  margin: auto;
  height: 50px;
  width: 55px;
  :hover {
    color: black;
  }
`;

const Item = styled(ListItem)`
  display: grid;
  overflow: hidden;
  grid-auto-flow: column;
  height: 70px;
  grid-template-columns: 1fr 8fr 1fr 80px;
  border-top: 0.5px lightgray solid;
`;
const TrackImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin: auto 15px;
  z-index: 2;
  border-radius: 5px;
`;
const Track = ({ track, playTrack }) => {
  const { name, artists, album, id, duration_ms } = track;
  return (
    <Item onClick={() => playTrack(id)}>
      <TrackImage size="md" src={album.images[0].url} />
      <Grid direction="row" justify="center" alignItems="center">
        <P my={2} color="black" font="md">
          {name}
          <P my={2} font="sm" color="gray">
            {artists.map(artists => `${artists.name} `)}
          </P>
        </P>
      </Grid>
      <P font="md" color="black">
        {ConvertMs(duration_ms)}
      </P>
      <PlayButton onClick={() => playTrack(id)} />
    </Item>
  );
};

export default Track;
