import React from "react";

import Track from "../Track";
import Table from "../../styled/Table";
import styled from "styled-components";

const HeaderRow = styled(Table.Row)`
  font-size: 14px;
  border-bottom: 0.5px lightgray solid;
  > th {
    padding: 10px 0;
    color: gray;
  }
`;

const TrackTable = props => {
  const { playTrack, tracks } = props;
  return (
    <Table mx="xxl" my="lg" overflow="auto">
      <HeaderRow>
        <Table.Header>{/* For Play Button */}</Table.Header>
        <Table.Header>Title</Table.Header>
        <Table.Header>Artist</Table.Header>
        <Table.Header>Album</Table.Header>
        <Table.Header>Time</Table.Header>
      </HeaderRow>
      {tracks.map(track => <Track track={track} playTrack={playTrack} />)}
    </Table>
  );
};

export default TrackTable;
