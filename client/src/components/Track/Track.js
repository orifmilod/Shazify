import React from "react";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

const Track = ({ track, playTrack }) => {
  const { name, artists, album, id } = track;
  return (
    <>
      <ListItem button onClick={() => playTrack(id)}>
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
