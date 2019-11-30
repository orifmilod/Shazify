import React from "react";
import styled from "styled-components";

const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
`;

const Player = props => {
  //Player type can be track or album
  const { trackID } = props;
  const encodedUriID = encodeURI(trackID);
  return (
    <IFrame
      src={`https://open.spotify.com/embed/track/${encodedUriID}`}
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
};

export default Player;
