import React from "react";

import { Table } from "../../styled";
import styled from "styled-components";
import ConvertMs from "../../utils/ConvertMs";

const BodyRow = styled(Table.Row)`
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

const PlayButton = styled.i`
  color: rgba(0, 0, 0, 0);
  height: 36px;
  width: 36px;
  margin: 0 5px;
  transition: 0.2s ease-in-out;
`;

export default function Track({ track, playTrack }) {
  const { name, artists, album, id, duration_ms } = track;

  return (
    <BodyRow key={id} onClick={() => playTrack(id)}>
      <Table.Data> <PlayButton className='far fa-play-circle' /> </Table.Data>
      <Table.Data>{name}</Table.Data>
      <Table.Data>{artists.map(artist => `${artist.name} `)}</Table.Data>
      <Table.Data>{album.name}</Table.Data>
      <Table.Data>{ConvertMs(duration_ms)}</Table.Data>
    </BodyRow>
  );
};

