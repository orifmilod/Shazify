import React from "react";
import styled from "styled-components";

const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
`;

const PlayerBox = styled.div`
  height: 100%;
  width: 100%;
`;
export default function Player({ trackID }) {
  if (!trackID) {
    return (
      <PlayerBox>
        Start listening now by playing a song :)
      </PlayerBox>
    )
  }
  const encodedUriID = encodeURI(trackID);
  return (
    <IFrame
      src={`https://open.spotify.com/embed/track/${encodedUriID}`}
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
}