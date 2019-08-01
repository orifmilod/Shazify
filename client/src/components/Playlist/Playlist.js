import React from "react";
import P from "../../styled/P";
import ListItem from "../../styled/ListItem";
import { KeyboardArrowRight } from "styled-icons/material";
import styled from "styled-components";

const ArrowIcon = styled(KeyboardArrowRight)`
  height: 25px;
  width: 25px;
  position: absolute;
  right: 10px;
  :hover {
    transform: scale(1.5);
  }
`;
const Playlist = props => {
  const { playlists } = props;
  return (
    <>
      <ul>
        <P mx={11} my={2} font="xxl" color="white">
          PLAYLIST
        </P>
        {playlists &&
          playlists.map(pl => (
            <ListItem
              color="white"
              mx={3}
              space={2}
              align="left"
              key={pl.id}
              onClick={() => console.log(pl.id)}
              divide="lightyellow"
              font="lg"
            >
              {pl.name}
              <ArrowIcon />
            </ListItem>
          ))}
      </ul>
    </>
  );
};

export default Playlist;
