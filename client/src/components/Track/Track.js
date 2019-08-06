import React from "react";

import Grid from "../../styled/Grid";
import Image from "../../styled/Image";
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

const TrackContainer = styled(Grid)`
  grid-auto-flow: column;
  height: 110px;
  grid-template-columns: 1fr 8fr 1fr 80px;
  background: linear-gradient(to right, #f2c94c, #f2994a);
  border-radius: 50px;
  box-shadow: 5px 5px 7px 0px rgba(0, 0, 0, 0.75);

  transition: 0.2s ease-in-out;
  transform: translate(0px, 0px);
  :hover {
    transform: translate(-5px, -5px);
  }
`;
const ClipBg = styled.span`
  position: absolute;
  background: linear-gradient(to right, #ff5e62, #ff9966);
  width: 100%;
  height: 100%;
  border-radius: 50px;
  clip-path: polygon(0 0, 15% 0, 30% 100%, 0 100%);
`;
const TrackInage = styled(Image)`
  margin: auto 0 auto 10px;
  z-index: 2;
`;
const Track = ({ track, playTrack }) => {
  const { name, artists, album, id, duration_ms } = track;
  return (
    <TrackContainer onClick={() => playTrack(id)}>
      <ClipBg />
      <TrackInage size="md" src={album.images[0].url} />
      <Grid direction="row" justify="center" alignItems="center">
        <P my={2} color="white" font="md">
          {name}
          <P my={2} font="sm" color="white">
            {artists.map(artists => `${artists.name} `)}
          </P>
        </P>
      </Grid>
      <P my={2} font="md" color="white">
        {ConvertMs(duration_ms)}
      </P>
      <PlayButton onClick={() => playTrack(id)} />
    </TrackContainer>
  );
};

export default Track;
