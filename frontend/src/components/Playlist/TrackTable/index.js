import React from "react";
import styled from "styled-components";

import Track from "./Track";
import { Table } from "../../../styled";

const HeaderRow = styled(Table.Row)`
  font-size: 14px;
  border-bottom: 0.5px lightgray solid;
  > th {
    padding: 10px 0;
    color: gray;
  }
`;

export default function TrackTable({ playTrack, tracks }) {
  return (
    <Table mx="xxl" my="lg" overflow="auto">
      <HeaderRow>
        <Table.Header>{/* For Play Button */}</Table.Header>
        <Table.Header>Title</Table.Header>
        <Table.Header>Artist</Table.Header>
        <Table.Header>Album</Table.Header>
        <Table.Header>Time</Table.Header>
      </HeaderRow>
      {tracks.map(track => track && <Track track={track} playTrack={playTrack} />)}
    </Table>
  );
};