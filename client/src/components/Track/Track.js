import React from "react";
import styled from "styled-components";
import Image from "../../common/Image";
import Hr from "../../common/Hr";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const Play = styled.i`
  font-size: 18px;
  position: absolute;
  right: 0;
  padding: 10px 30px;
  :hover {
    color: lightgreen;
  }
`;

const Track = ({ track, playTrack }) => {
  const { name, artists, album, id } = track;
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={album.images[0].url} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={artists.map(artists => `${artists.name} `)}
        />
      </ListItem>
      <Divider variant="middle" />
    </>
  );
};

export default Track;
