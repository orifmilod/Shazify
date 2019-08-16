import React from "react";
import Track from "../Track";

import { Table, Header, Row } from "../../styled/Table";
import styled from "styled-components";

const HeaderRow = styled(Row)`
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
        <Header>{/* For Play Button */}</Header>
        <Header>Title</Header>
        <Header>Artist</Header>
        <Header>Album</Header>
        <Header>Time</Header>
      </HeaderRow>
      {tracks.map(track => (
        <Track track={track} playTrack={playTrack} />
      ))}
    </Table>
  );
};

export default TrackTable;
