import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { List, Grid, P } from "../../../styled";
import { KeyboardArrowRight } from "styled-icons/material";

const ArrowIcon = styled(KeyboardArrowRight)`
  height: 25px;
  width: 25px;
  position: absolute;
  right: 20px;
  transition: 0.3s ease-in-out;
`;
const Item = styled(List.Item)`
  padding: 8px 30px;
  border-left: 3px orange solid;
  :hover {
    ${ArrowIcon} {
      transform: translateX(8px);
    }
  }
`;
const PlaylistList = styled(List)`
  text-align: left;
  grid-gap: 10px;
`;

const Playlist = props => {
  const { playlists, history } = props;
  return (
    <Grid direction="row" py="xxl">
      <PlaylistList>
        <P font="lg" px={30} py={10} color="white" align="left" weight="bolder">
          Playlists
        </P>
        {playlists &&
          playlists.map(playlist => (
            <Item
              color="lightGray"
              align="left"
              key={playlist.id}
              onClick={() => history.push(`/home/playlist/${playlist.id}`)}
              font="14px"
            >
              {playlist.name}
              <ArrowIcon />
            </Item>
          ))}
      </PlaylistList>
    </Grid>
  );
};

export default withRouter(Playlist);
