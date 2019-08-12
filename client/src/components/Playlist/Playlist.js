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
  transition: 0.3s ease-in-out;
`;
const Item = styled(ListItem)`
  :hover {
    ${ArrowIcon} {
      transform: translateX(8px);
    }
  }
`;
const Playlist = props => {
  const { playlists, getPlaylist } = props;
  return (
    <>
      <ul>
        <P mx={11} my={2} font="xxl" color="white">
          PLAYLIST
        </P>
        {playlists &&
          playlists.map(pl => (
            <Item
              color="white"
              mx={3}
              space={2}
              align="left"
              key={pl.id}
              onClick={() => getPlaylist(pl.id)}
              divide="lightyellow"
              font="14px"
            >
              {pl.name}
              <ArrowIcon />
            </Item>
          ))}
      </ul>
    </>
  );
};

export default Playlist;
