import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';
const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
`;

const PlayerBox = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  padding: 40px;
  background: linear-gradient(to left, #FF4B2B, #FF416C); 
`;

export default function Player() {
  const trackID = useSelector(state => state.playingTrackID);

  if (!trackID) {
    return <PlayerBox> Start listening now by playing a song :) </PlayerBox>
  }

  const encodedUriID = encodeURI(trackID);
  return (
    <IFrame
      frameborder="0"
      allow="encrypted-media"
      allowtransparency="true"
      src={`https://open.spotify.com/embed/track/${encodedUriID}`}
    />
  );
}