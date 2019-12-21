import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Track from "./Track";
import { Table } from "../../../styled";
import Loading from '../../Loading';

const HeaderRow = styled(Table.Row)`
  font-size: 14px;
  border-bottom: 0.5px lightgray solid;
  > th {
    padding: 10px 0;
    color: gray;
  }
`;



export default function TrackTable({ tracks }) {
  // const [reachBottom, setReachedBottom] = useState(false);
  // function onScroll() {
  //   console.log('Scrolling')
  //   if (hasReachedBottom())
  //     setReachedBottom(true);
  // };
  // useEffect(() => {
  //   const elem = document.getElementById('track-table');
  //   elem.addEventListener('scroll', onScroll, false);
  //   return () => {
  //     elem.addEventListener("scroll", onScroll, false);
  //   };
  // }, []);

  // function hasReachedBottom() {
  //   console.log('Checking');
  //   return (
  //     document.body.offsetHeight + document.body.scrollTop ===
  //     document.body.scrollHeight
  //   );
  // }

  // const TrackContainer = styled.div`
  // overflow: auto;
  // `
  return (
    <Table id='track-table' mx="xxl" my="lg" overflow="auto">
      <HeaderRow>
        <Table.Header>{/* For Play Button */}</Table.Header>
        <Table.Header>Title</Table.Header>
        <Table.Header>Artist</Table.Header>
        <Table.Header>Album</Table.Header>
        <Table.Header>Time</Table.Header>
      </HeaderRow>
      {/* <TrackContainer> */}
      {tracks.map(track => track && <Track track={track} />)}
      {/* </TrackContainer> */}
      {/* {reachBottom && <Loading />} */}
    </Table>
  );
};