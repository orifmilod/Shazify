import React from "react";
import styled from "styled-components";

const IFrame = styled.iframe`
  height: 100%;
  width: 100%;
`;


const PlayerBox = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  vertical-align:middle;
  font-size: 24px;
background: linear-gradient(to left, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding: 30px;
  color: white;
`;

const Player = ({ trackID }) => {
  //Player type can be track or album
  const encodedUriID = encodeURI(trackID);
  if (!trackID) {
    return (
      <PlayerBox>
        Start listening now by playing a song :)
      </PlayerBox>
    )
  }
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
