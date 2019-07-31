import React from "react";
import P from "../../common/P";
import ListItem from "../../common/ListItem";
import { KeyboardArrowRight } from "styled-icons/material";
import styled from "styled-components";

const ArrowIcon = styled(KeyboardArrowRight)`
  height: 25px;
  width: 25px;
  position: absolute;
  right: 25px;
  :hover {
    transform: scale(1.5);
  }
`;
const Playlist = props => {
  const { playlists } = props;
  return (
    <>
      <ul>
        <P mx={11} my={0} font="xxl" color="white">
          PLAYLIST
        </P>
        {playlists &&
          playlists.map(pl => (
            <ListItem
              color="white"
              mx={6}
              space={3}
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
