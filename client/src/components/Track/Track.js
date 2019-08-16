import React from "react";

import { Row, Data } from "../../styled/Table";
import { Play } from "styled-icons/evil";
import styled from "styled-components";
import ConvertMs from "../../utils/ConvertMs";

const BodyRow = styled(Row)`
  > td {
    padding: 10px 0;
    font-size: 14px;
  }
  :hover {
    background: #ececec;
    > td > svg {
      color: black;
    }
  }
  border-bottom: 0.5px lightgray solid;
`;

const PlayButton = styled(Play)`
  color: rgba(0, 0, 0, 0);
  height: 36px;
  width: 36px;
  margin: 0 5px;
  transition: 0.2s ease-in-out;
`;
const Track = props => {
  const { track, playTrack } = props;
  const { name, artists, album, id, duration_ms } = track;

  return (
    <BodyRow key={id} onClick={() => playTrack(id)}>
      <Data>
        <PlayButton />
      </Data>
      <Data>{name}</Data>
      <Data>{artists.map(artist => `${artist.name} `)}</Data>
      <Data>{album.name}</Data>
      <Data>{ConvertMs(duration_ms)}</Data>
    </BodyRow>
  );
};

export default Track;
