import React from "react";
import styled from "styled-components";

const IFrame = styled.iframe`
  height: 100px;
  right: 0;
  width: 100vw;
  bottom: 0;
`;

const Player = props => {
  const { trackID } = props;
  const encodedUriID = encodeURI(trackID);

  return (
    <IFrame
      src={`https://open.spotify.com/embed/track/${encodedUriID}`}
      frameborder="0"
      className="no-gutters"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
};

export default Player;
