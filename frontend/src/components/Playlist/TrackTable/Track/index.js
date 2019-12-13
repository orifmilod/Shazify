import React from "react";
import { useDispatch } from 'react-redux';

import { Table } from "../../../../styled";
import { UPDATE_CURRENT_TRACK_ID } from "../../../../constant/actionTypes";
import styled from "styled-components";


import ConvertMs from "../../../../utils/ConvertMs";

const BodyRow = styled(Table.Row)`
  > td {
    padding: 10px 0;
    font-size: 14px;
  }
  :hover {
    background: #ececec;
    > td > i {
      color: black;
    }
  }
  border-bottom: 0.5px lightgray solid;
`;

const PlayButton = styled.i`
  color: rgba(0, 0, 0, 0);
  padding: 10px;
  height: 50px;
  width: 50px;
  margin: 0 5px;
  transition: 0.2s ease-in-out;
`;

export default function Track({ track }) {
  const { name, artists, album, id, duration_ms } = track;
  const dispatch = useDispatch();

  return (
    <BodyRow key={id} onClick={() => dispatch({ type: UPDATE_CURRENT_TRACK_ID, payload: id })}>
      <Table.Data>
        <PlayButton className='far fa-play-circle fa-2x' />
      </Table.Data>
      <Table.Data>{name}</Table.Data>
      <Table.Data>{artists.map(artist => `${artist.name} `)}</Table.Data>
      <Table.Data>{album.name}</Table.Data>
      <Table.Data>{ConvertMs(duration_ms)}</Table.Data>
    </BodyRow>
  );
};

